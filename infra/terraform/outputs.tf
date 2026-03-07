output "bastion_publicip" {
    value = module.eks.bastion_publicip
  
}

output "cluster_endpoint" {
    value = module.eks.cluster_endpoint
  
}
output "cluster_name" {
    value = module.eks.cluster_name
}