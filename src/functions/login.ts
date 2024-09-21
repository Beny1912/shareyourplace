import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as googleJSON from "./../assets/security/client_secret_google.json";
export async function login(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(googleJSON.web.client_id);
    context.log('Handling login with Google.');

    const { token } = JSON.parse(await request.text());
    
        if (!token) {
            return { status:400, body: "Token is required" };
           
        }

        try {
            // Verificar el token con Google
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: googleJSON.web.client_id,  // Especifica el CLIENT_ID de tu app
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
        
            // El token es válido, puedes autenticar al usuario o guardarlo en la base de datos
          
                return {status:200, jsonBody: { message: "Login successful", payload}}; 
            
        } catch (error) {

            context.log('Error during token verification:', error);
            return {status: 401, jsonBody: error};
            
        }

};

app.http('login', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: login
});
