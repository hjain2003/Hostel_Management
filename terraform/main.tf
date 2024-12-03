provider "aws" {
  region = "ap-south-1" # Replace with your preferred AWS region
}

resource "aws_instance" "app_server" {
  ami           = "ami-053b12d3152c0cc71" 
  instance_type = "t2.micro"           

  # Key pair for SSH access (ensure this key exists in your AWS account)
  key_name = "harsh-key"

  # Security group for the instance
  security_groups = [Beanfirst-env]

  # User data script to initialize your application
  user_data = <<-EOF
              #!/bin/bash
              apt update -y
              apt install -y docker.io
              systemctl start docker
              docker run -d -p 5000:5000 hjain2003/hostelserverimg
              docker run -d -p 3000:3000 hjain2003/hostelclientimg
              EOF

  tags = {
    Name = "MyAppServer"
  }
}

# Security group for allowing HTTP and SSH access
resource "aws_security_group" "app_sg" {
  name        = "app_security_group"
  description = "Allow HTTP, HTTPS, and SSH access"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow SSH from anywhere
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow HTTP
  }

  ingress {
    from_port   = 3000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow app ports
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
