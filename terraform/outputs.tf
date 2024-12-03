output "instance_public_ip" {
  value = aws_instance.app_server.public_ip
  description = "Public IP of the instance"
}
