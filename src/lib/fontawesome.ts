// src/lib/fontawesome.ts
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { faMapMarkerAlt, faPhone, faEnvelope, faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faWhatsapp, faTiktok, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

// Evita que FontAwesome inyecte CSS automáticamente (Next.js lo hace mejor)
config.autoAddCss = false;

if (typeof window !== "undefined") {
  // Solo registra iconos en el cliente
  library.add(
    faMapMarkerAlt,
    faPhone,
    faEnvelope,
    faLaptopCode,
    faFacebookF,
    faInstagram,
    faWhatsapp,
    faTiktok,
    faLinkedin
  );
}
