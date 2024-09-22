
import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";
// URL de tu Azure Key Vault
const keyVaultUrl = "https://shareyourplace.vault.azure.net/";

export async function getkey(name: string): Promise<any> {

}
export async function getSecret(name: string): Promise<any> {

    try {
         // Autenticación con Managed Identity usando DefaultAzureCredential
         const credential = new DefaultAzureCredential();
         console.log(credential);
         
         // Cliente para interactuar con Key Vault
         const client = new SecretClient(keyVaultUrl, credential);
         console.log(client);
         
         // Obtener el secreto desde Key Vault
         const secret = await client.getSecret(name);
         console.log(secret);
         return secret['value'];
        
    } catch (error) {
        return error;
    }

}
export async function getCertificate(name: string): Promise<any> {

}