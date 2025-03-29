# Your Personal BMI Tracker

## Introduction

Welcome to **Your Personal BMI Tracker**, a lightweight and user-friendly web application designed to help you calculate your Body Mass Index (BMI) and learn more about your health classification and associated risks. The app uses a powerful and efficient BMI calculator API from **RapidAPI** to fetch real-time BMI data and provide meaningful insights.

---

## Features

- **Calculate BMI**: Input your weight and height to calculate your BMI.
- **Health Classification**: Understand where your BMI stands in terms of being underweight, normal, overweight, or obese.
- **Health Risks and Insights**: Learn about potential health risks associated with your BMI classification.
- **Resources for Health**: Provides additional links and resources for improving or maintaining a healthy BMI.

---

## Deployment Instructions

Below are the steps we followed to deploy the application onto the servers and set up the load balancer.

### 1. **Prepare the Web Servers (`web-01` and `web-02`)**
- Installed **Nginx** on both servers:
  
  \`\`\`bash
  sudo apt update
  sudo apt install nginx
  \`\`\`

- Transferred application files to both servers:
  
  \`\`\`bash
  scp -r Your-BMI_tracker/ ubuntu@<web-server-ip>:/home/ubuntu/
  \`\`\`

- Moved files to Nginx's root directory:
  
  \`\`\`bash
  sudo mv ~/Your-BMI_tracker /var/www/html/bmi-tracker
  \`\`\`

- Configured Nginx to serve the application (/etc/nginx/sites-available/default):
  
  \`\`\`nginx
  server {
      listen 80;
      server_name <web-server-domain>;
      
      root /var/www/html/bmi-tracker;
      index index.html;

      location / {
          try_files $uri $uri/ =404;
      }
  }
  \`\`\`

- Restarted Nginx:
  
  \`\`\`bash
  sudo systemctl restart nginx
  \`\`\`

### 2. **Set Up the Load Balancer (`lb-01`)**
- Installed HAProxy on the load balancer server:
  
  \`\`\`bash
  sudo apt update
  sudo apt install haproxy
  \`\`\`

- Configured HAProxy (/etc/haproxy/haproxy.cfg) to distribute traffic:
  
  \`\`\`haproxy
  frontend https_front
      bind *:443 ssl crt /etc/letsencrypt/live/www.mutabazi.tech/haproxy.pem
      default_backend web_backend

  frontend http_front
      bind *:80
      redirect scheme https if !{ ssl_fc }

  backend web_backend
      balance roundrobin
      server web01 <web-01-ip>:80 check
      server web02 <web-02-ip>:80 check
  \`\`\`

- Obtained SSL certificates using Certbot:
  
  \`\`\`bash
  sudo apt install certbot
  sudo certbot certonly --standalone -d www.mutabazi.tech -d lb-01.mutabazi.tech
  \`\`\`

- Restarted HAProxy:
  
  \`\`\`bash
  sudo systemctl restart haproxy
  \`\`\`

## Accessing the Application

**Public URL:** [https://www.mutabazi.tech](https://www.mutabazi.tech)

Clients can access the application through this secure URL. The load balancer ensures traffic is distributed between servers for better reliability and scalability.

## How It Works

1. **Input Your Data**: Enter your weight and height into the form on the app.
2. **Calculate BMI**: Click the "Calculate BMI" button to calculate your BMI.
3. **View Results**: Instantly see your BMI, health classification, and associated health risks.
4. **Learn More**: Use the resources in the sidebar to explore more about BMI and maintaining a healthy lifestyle.

## API Integration

This application uses the **Body Mass Index - BMI Calculator API** from RapidAPI:

- **API URL:** [https://body-mass-index-bmi-calculator.p.rapidapi.com/metric](https://body-mass-index-bmi-calculator.p.rapidapi.com/metric)
- **API Key:** Replace `<YOUR_API_KEY>` in `script.js` with your actual RapidAPI key.

## Demo Video

A walkthrough of the application can be found here: [Watch on YouTube] (https://youtu.be/492l-HqdZW8?si=dNNUvL-yMjYbX7gT)

## License

This project is licensed under the **MIT License**. See the LICENSE file for more details.

## Author

This application was designed and developed by **Francis MUTABAZI**.
EOF

