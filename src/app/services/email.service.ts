import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class EmailService {

  // Para pruebas locales:
  //backend = "http://localhost:3000";

  // Para producción (Render):
  backend = "https://backend-portafolio-2wbm.onrender.com"; //  cambia esto por tu URL de Render

  constructor(private http: HttpClient) {}

  sendEmail(to: string, subject: string, html: string) {
    return this.http.post(this.backend + "/send-email", {
      to,
      subject,
      html
    });
  }

  sendWhatsApp(to: string, message: string) {
    return this.http.post(this.backend + "/send-whatsapp", {
      to,
      message
    });
  }
}
