import json
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import os

import pymysql
import re
import requests

#flask connection
load_dotenv()
app = Flask(__name__)


# #mysql connection
conn = pymysql.connect(host=os.getenv('DB_HOST'),
                             user=os.getenv('DB_USER'),
                             password=os.getenv('DB_PASSWORD'),
                             database=os.getenv('DB_NAME'),
                             cursorclass=pymysql.cursors.DictCursor, connect_timeout=3600)

@app.route('/',)
def index():
    return render_template('home.html')


@app.route('/childcare')
def child():
    return render_template('childcare-map.html')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

def parse_json_string(json_string):
    """Parse a JSON string into a dictionary."""
    try:
        return json.loads(json_string)
    except json.JSONDecodeError:
        return json_string

def flatten_json(data, parent_key=''):
    """Recursively flatten the JSON data, keeping only the last key in nested structures."""
    items = []
    for k, v in data.items():
        # Replace spaces and special characters in the keys
        formatted_key = re.sub(r"[^\w]", "_", k)
        if parent_key:
            new_key = '{}_{}'.format(parent_key, formatted_key)
        else:
            new_key = formatted_key
        
        if isinstance(v, dict):
            # Recursively flatten the dictionary, but only keep the last key
            items.extend(flatten_json(v, new_key).items())
        elif isinstance(v, list):
            for i, item in enumerate(v):
                items.extend(flatten_json(item, '{}[{}]'.format(new_key, i)).items())
        elif isinstance(v, str):
            # Parse nested JSON strings
            parsed_value = parse_json_string(v)
            if isinstance(parsed_value, dict):
                items.extend(flatten_json(parsed_value, new_key).items())
            else:
                items.append((formatted_key, v))  # Use only the last key
        else:
            items.append((formatted_key, v))  # Use only the last key
    return dict(items)

def extract_data_v2(json_data):
    """Extract and flatten JSON data."""
    extracted_data = {}
    for company_info in json_data:
        # Flatten the company_info JSON and add to the result
        flattened_info = flatten_json(company_info)
        company_name = company_info.get('company', 'Unknown Company')
        extracted_data[company_name] = flattened_info
    return extracted_data


def parse_employee_range(num_employees):
    if num_employees == "< 250 employees":
        return 0, 249
    elif num_employees == "250-499 employees":
        return 250, 499
    elif num_employees == "500-999 employees":
        return 500, 999
    elif num_employees == "1000-4999 employees":
        return 1000, 4999
    elif num_employees == "5000+ employees":
        return 5000, float('inf')  # Use 'inf' to represent "more than 5000"
    else:
        return None  # or return (0, 0) if you want a default range


def map_benefit_key(benefit):
    benefit_map = {
        'flexible_hours_of_work': 'Flexible_hours_of_work',
        'internal_support_networks_for_parents': 'Internal_support_networks_for_parents',
        'part_time_work': 'Part_time_work',
        'parenting_workshops_targeting_mothers': 'Parenting_workshops_targeting_mothers',
        'superannuation_contribution_to_secondary_carers': 'Do_you_pay_superannuation_contribution_to_your_secondary_carers_while_they_are_on_parental_leave',
        'telecommuting': 'Telecommuting__e_g__working_from_home_',
        'part_time_work_non_managers': 'Part_time_work__non_managers_',
        'workplace_safety_planning': 'Workplace_safety_planning',
        'compressed_working_weeks': 'Compressed_working_weeks',
        'job_sharing_non_managers': 'Job_sharing__non_managers_',
        'purchased_leave_non_managers': 'Purchased_leave__non_managers_',
        'access_to_medical_services': 'Access_to_medical_services__e_g__doctor_or_nurse_',
        'on_site_childcare': 'On_site_childcare',
        'information_packs_for_new_parents': 'Information_packs_for_new_parents',
        'coaching_for_employees_on_returning_to_work': 'Coaching_for_employees_on_returning_to_work',
        'compressed_working_weeks_non_managers': 'Compressed_working_weeks__non_managers_',
        'support_in_securing_school_holiday_care': 'Support_in_securing_school_holiday_care',
        'purchased_leave': 'Purchased_leave',
        'carer_leave': 'Carer_leave',
        'emergency_accommodation_assistance': 'Emergency_accommodation_assistance',
        'offer_change_of_office_location': 'Offer_change_of_office_location',
        'carer_leave_non_managers': 'Carer_leave__non_managers_',
        'time_in_lieu_non_managers': 'Time_in_lieu__non_managers_',
        'parenting_workshops_targeting_fathers': 'Parenting_workshops_targeting_fathers',
        'flexible_hours_of_work_non_managers': 'Flexible_hours_of_work__non_managers',
        'remuneration': 'Remuneration',
        'flexible_working_arrangements': 'Flexible_working_arrangements',
        'support_gender_equality': 'Support_gender_equality',
        'support_employees_with_family': 'Support_employees_with_family',
        'primary_carers_within_certain_time_after_birth': 'Primary_carers_within_certain_time_after_birth',
        'primary_carers_after_completing_qualifying_work_period': 'Primary_carers_after_completing_qualifying_work_period',
        'regardless_of_carer_status': 'regardless_of_carer_status',
        'secondary_carers': 'Secondary_carers',
        'secondary_carers_within_certain_time_after_birth': 'Secondary_carers_within_certain_time_after_birth',
        'carers_after_completing_qualifying_work_period': 'Carers_after_completing_qualifying_work_period',
        'carers_within_certain_time_after_birth': 'Carers_within_certain_time_after_birth',
        'secondary_carers_after_completing_qualifying_work_period': 'Secondary_carers_after_completing_qualifying_work_period',
        'employee_training': 'Employee_training',
        'breastfeeding_facilities': 'Breastfeeding_facilities',
        'do_you_pay_superannuation_contribution_to_your_carers_while_they_are_on_parental_leave': 'Do_you_pay_superannuation_contribution_to_your_carers_while_they_are_on_parental_leave',
        'job_sharing': 'Job_sharing',
        'time_in_lieu': 'Time_in_lieu',
        'employee_assistance_program_including_access_to_psychologist_chaplain_or_counsellor': 'Employee_assistance_program__including_access_to_psychologist__chaplain_or_counsellor_',
    }
    return benefit_map.get(benefit, '')


def map_industry_key(industry):
    industry_match = {
        'mining': 'Mining',
        'professional_scientific_technical': 'Professional, Scientific and Technical Services',
        'arts_recreation': 'Arts and Recreation Services',
        'wholesale_trade': 'Wholesale Trade',
        'financial_insurance': 'Financial and Insurance Services',
        'rental_hiring_real_estate': 'Rental, Hiring and Real Estate Services',
        'electricity_gas_water_waste': 'Electricity, Gas, Water and Waste Services',
        'manufacturing': 'Manufacturing',
        'administrative_support': 'Administrative and Support Services',
        'accommodation_food': 'Accommodation and Food Services',
        'retail_trade': 'Retail Trade',
        'construction': 'Construction',
        'education_training': 'Education and Training',
        'information_media_telecommunications': 'Information Media and Telecommunications',
        'transport_postal_warehousing': 'Transport, Postal and Warehousing',
    }
    return industry_match.get(industry, '')

def map_sub_industry_key(sub_industry):
    sub_industry_match = {
        'heavy_civil_construction': 'Heavy and Civil Engineering Construction',
        'gambling_activities': 'Gambling Activities',
        'non_metallic_mineral_product_manufacturing': 'Non-Metallic Mineral Product Manufacturing',
        'sports_recreation_activities': 'Sports and Recreation Activities',
        'fuel_retailing': 'Fuel Retailing',
        'finance': 'Finance',
        'administrative_services': 'Administrative Services',
        'publishing': 'Publishing (except Internet and Music Publishing)',
        'accommodation': 'Accommodation',
        'electricity_supply': 'Electricity Supply',
        'exploration_mining_support': 'Exploration and Other Mining Support Services',
        'oil_gas_extraction': 'Oil and Gas Extraction',
        'petroleum_coal_product_manufacturing': 'Petroleum and Coal Product Manufacturing',
        'adult_community_education': 'Adult, Community and Other Education',
        'tertiary_education': 'Tertiary Education',
        'computer_system_design': 'Computer System Design and Related Services',
        'internet_publishing_broadcasting': 'Internet Publishing and Broadcasting',
        'polymer_rubber_product_manufacturing': 'Polymer Product and Rubber Product Manufacturing',
        'other_goods_wholesaling': 'Other Goods Wholesaling',
        'machinery_equipment_wholesaling': 'Machinery and Equipment Wholesaling',
        'professional_scientific_technical_services': 'Professional, Scientific and Technical Services (Except Computer System Design and Related',
        'rental_hiring_services': 'Rental and Hiring Services (except Real Estate)',
        'motor_vehicle_parts_retailing': 'Motor Vehicle and Motor Vehicle Parts Retailing',
        'air_space_transport': 'Air and Space Transport',
        'transport_support_services': 'Transport Support Services',
        'motion_picture_sound_recording': 'Motion Picture and Sound Recording Activities',
        'grocery_liquor_tobacco_wholesaling': 'Grocery, Liquor and Tobacco Product Wholesaling',
        'other_store_based_retailing': 'Other Store-Based Retailing',
        'beverage_tobacco_product_manufacturing': 'Beverage and Tobacco Product Manufacturing',
        'internet_service_providers': 'Internet Service Providers, Web Search Portals and Data Processing Services',
        'food_product_manufacturing': 'Food Product Manufacturing',
        'food_retailing': 'Food Retailing',
        'auxiliary_finance_insurance': 'Auxiliary Finance and Insurance Services',
        'transport_equipment_manufacturing': 'Transport Equipment Manufacturing',
        'basic_chemical_manufacturing': 'Basic Chemical and Chemical Product Manufacturing',
        'property_operators_real_estate_services': 'Property Operators and Real Estate Services',
        'insurance_superannuation_funds': 'Insurance and Superannuation Funds',
    }
    return sub_industry_match.get(sub_industry, '')


def filter_companies(companies, filters):
    filtered_companies = {}
    
    for name, company in companies.items():
        rating_match = False
        employee_match = False
        benefits_match = True
        industry_match = False

        # Filter by rating
        if 'rating' in filters and filters['rating']:
            rating_match = float(company['company_rating']) >= max(map(float, filters['rating']))
        else:
            rating_match = True

        # Filter by number of employees
        if 'employees' in filters and filters['employees']:
            num_employees = company['company_num_employees']
            employee_match = False

            company_range = parse_employee_range(num_employees)
            if company_range:
                comp_low, comp_high = company_range

                for emp_range in filters['employees']:
                    range_low, range_high = parse_employee_range(emp_range)

                    if range_low is not None and range_high is not None:
                        if (comp_low <= range_high and comp_high >= range_low):
                            employee_match = True
                            break
        else:
            employee_match = True

        # Filter by benefits
        if 'benefits' in filters and filters['benefits']:
            for benefit in filters['benefits']:
                key = map_benefit_key(benefit)
                if not company.get(key, 'N/A').startswith('Yes'):
                    benefits_match = False
                    break

        # Filter by industry and sub-industry
        if 'industry' in filters and filters['industry']:
            industry_match = False
            for industry in filters['industry']:
                value = map_industry_key(industry)
                if company.get('company_industry', 'N/A').lower() == value.lower():
                    industry_match = True
                    break
            if 'sub_industry' in filters and filters['sub_industry']:
                sub_industry_match = False
                for sub_industry in filters['sub_industry']:
                    value = map_sub_industry_key(sub_industry)
                    if company.get('sub_industry', 'N/A').lower() == value.lower():
                        sub_industry_match = True
                        break
                industry_match = industry_match and sub_industry_match
        else:
            industry_match = True  

        # Only include companies that match all criteria
        if rating_match and employee_match and benefits_match and industry_match:
            filtered_companies[name] = company

    return filtered_companies


@app.route("/get_mapbox_access_token")
def get_mapbox_access_token():
    mapbox_access_token = os.getenv('MAPBOX_ACCESS_TOKEN')
    mapbox_access_token_Care = os.getenv("MAPBOX_ACCESS_TOKEN_Care")
    return jsonify({"mapbox_access_token": mapbox_access_token, "mapbox_access_token_Care": mapbox_access_token_Care})


@app.route('/companies', methods=['GET'])
def get_companies():
    with app.app_context():
        try:
            cur = conn.cursor()
            cur.execute("SELECT *  FROM flaskdb.company_information")
            details = cur.fetchall()
        except pymysql.err.OperationalError as e:
            if e.args[0] == 2013:
                # Reconnect to the database
                conn.ping(reconnect=True)
                cur = conn.cursor()
                cur.execute("SELECT *  FROM flaskdb.company_information")
                details = cur.fetchall()
            else:
                raise
        cur.close()
        final_data = []
        for i in details:
            i["company_rating"] = float(i["company_rating"])
            final_data.append(i)
    
    
    details_extracted = extract_data_v2(final_data)
    filters = {
        'rating': request.args.getlist('rating'),
        'employees': request.args.getlist('employees'),
        'benefits': request.args.getlist('benefits'),
        'industry': request.args.getlist('industry'),
        'sub_industry': request.args.getlist('sub_industry')
    }

    if not any(filters.values()):
        filtered_companies = details_extracted
    else:
        filtered_companies = filter_companies(details_extracted, filters)
  
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        # Return the HTML for the company cards only
        return render_template('company_cards.html', companies=filtered_companies)
    else:
        return render_template('companies.html', companies=filtered_companies)
    

# load JSON data
def load_json_data():
    data = {}
    file_names = {
        'academy': 'Academy.json',
        'childcarecenters': 'Childcarecenters.json',
        'earlylearningcenters': 'Earlylearning.json',  
        'kindergartens': 'Kindergartens.json',  
        'OSHC': 'OSHC.json',
        'preschools': 'Preschools.json'
    }
    for layer, file_name in file_names.items():
        try:
            with open(f'static/json/{file_name}', 'r') as f:
                data[layer] = json.load(f)
        except FileNotFoundError:
            print(f"Warning: File {file_name} not found.")
    return data

json_data = load_json_data()

@app.route('/api/place-details')
def get_place_details():
    lat = float(request.args.get('lat'))
    lng = float(request.args.get('lng'))
    layer = request.args.get('layer')
    
    if layer not in json_data:
        return jsonify({'error': f'Layer {layer} not found in local data'})
    
    # Get place info from JSON file using approximate matching
    place_info = next((feature for feature in json_data[layer]['features'] 
                       if abs(feature['geometry']['coordinates'][0] - lng) < 0.0001 
                       and abs(feature['geometry']['coordinates'][1] - lat) < 0.0001), None)
    
    if not place_info:
        # If no matching place is found, return the nearest place
        place_info = min(json_data[layer]['features'], 
                         key=lambda x: (x['geometry']['coordinates'][0] - lng)**2 + 
                                       (x['geometry']['coordinates'][1] - lat)**2)
    
    result = {
        'name': place_info['properties']['name'],
        'address': place_info['properties'].get('address', 'Address not available'),
        'opening_hours': place_info['properties'].get('opening_hours', {}),
        'services': place_info['properties'].get('services', {})
    }
    
    # Handling the "unavailable" case
    for day, hours in result['opening_hours'].items():
        if hours == "unavailable":
            result['opening_hours'][day] = {"start": "Unavailable", "end": ""}
    
    return jsonify(result)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
