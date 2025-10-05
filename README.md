Nari: Maternity Meets Opportunity
1. Project Explanation / Philosophy

Nari is a comprehensive platform designed to support expectant and current mothers in Australia as they navigate the challenge of balancing family life and career responsibilities without sacrificing either.

Our core mission is to empower mothers and actively contribute to closing the 

gender wage gap in Australia. Studies show that mothers face significant obstacles upon re-entering the workforce, including being less likely to receive promotions or salary increases.

Nari is a valuable resource that addresses this disparity by providing mothers with two main tools:

1. Mum-friendly Workplaces: Essential information about companies offering the best maternal benefits (e.g., paid parental leave, remote work options).
  
2. Care Centers for Kids: Information on high-quality childcare centers to enable informed decisions that support both their careers and their families.

2. Tech Stack
The Nari project is built on the LLMP Framework for stability and scalability:
  1. Linux: Ubuntu Server 24.04 LTS (HVM) as the operating system.
  2. Linux Web Server: nginx 1.24.0 (Ubuntu) for efficient data transfer and serving.
  3. MySQL Database: AWS RDS MySQL Community (MySQL Workbench 8.0.38) for data storage, hosted on a separate AWS instance.
  4. Python Backend: Python 3.12.3 with the Flask framework for rapid web application development and server-side logic.
  5. Cloud Hosting: AWS EC2 (t2.micro, ap-southeast-2a region) for infrastructure and hosting.

3. These steps outline how to set up the project locally for development.

Prerequisites
  Git
  Python 3.12.3 and pip3

Installation and Setup
1. Clone the Repository
  Git clone /project/folder
  cd project/folder

2. Install Python Packages
Ensure python3-pip is installed:
   sudo apt-get install python3-pip

Install dependencies from the requirements.txt file:
  pip3 install -r requirements.txt

3. Set up the Virtual Environment
  sudo apt install python3-venv
  python3 -m venv venv

Run the Project Locally (Without Web Server)
Activate the virtual environment and run the main application file:

  source venv/bin/activate  
  Python3 main.py

  4. Key Features
   4.1. Mum-friendly Workplaces
      This feature provides a comprehensive search and comparison engine for companies in Melbourne:
     
      Search and Filter: Identify companies by name, industry, sub-industry, employee rating (e.g., 4 or higher), and employee count.

      Maternal Benefits: Search specifically by desired maternity-related benefits, such as breastfeeding facilities, parental workshops, or remote work options.

     Company Score: An effective method to evaluate a company's commitment to maternal support. The score is determined by the total number of benefits offered (max 45), categorizing companies as 'Low' (0-0.5), 'Medium' (0.5-0.7), or 'High' (0.7-1.0).

     Comparison Tool: Visually compare multiple companies based on the total number of benefits and employee rating.

  4.2. Care Centers for Kids
    This tool helps mothers find and evaluate early learning and childcare options:
     
  NQS Rating Filter: Locate centers on a map that satisfy a specific National Quality Standard (NQS) Rating (e.g., Working Towards, Meeting, Exceeding).

  Commute Planning: Plan a commute route and display childcare centers that fall along the way to minimize deviation from the route to the workplace.

  Glossary of Terms: A glossary is provided for users unfamiliar with specific terms related to childcare centers, offering brief information and external hyperlinks.

5. Development and Maintenance
The Nari project uses the Agile Scrum Framework for development, centered around 3-week long Sprints.

Process: Each sprint includes a planning meeting, followed by Daily Stand-ups to share progress and challenges, and concludes with a Sprint Retrospective to evaluate performance and collaboratively identify improvements.

Infrastructure: The infrastructure relies on key roles, including DevOps Engineers (for CI/CD management and infrastructure oversight) and Back-End Developers (proficient in Python/Flask and MySQL/AWS) to ensure stability and performance.
