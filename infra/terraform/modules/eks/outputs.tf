output "bastion_publicip" {
    value = aws_instance.bastion_host.public_ip
  
}

output "cluster_endpoint" {
  value = aws_eks_cluster.eks_controller_cluster.endpoint
}

output "cluster_name" {
  value = aws_eks_cluster.eks_controller_cluster.name
}

