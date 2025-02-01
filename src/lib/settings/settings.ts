export class Settings {
  postgresUser: string;
  postgresPassword: string;
  postgresDatabase: string;
  postgresHost: string;
  postgresPort: number;
  caCertificate: string;
  jwtSecret: string;
  geminiApiKey: string;

  constructor() {
    this.postgresUser = this.getValue("POSTGRES_USER", "postgres");
    this.postgresPassword = this.getValue("POSTGRES_PASSWORD", "postgres");
    this.postgresDatabase = this.getValue("POSTGRES_DATABASE", "postgres");
    this.postgresHost = this.getValue("POSTGRES_HOST", "localhost");
    this.postgresPort = Number(this.getValue("POSTGRES_PORT", "5432"));
    this.caCertificate = this.getValue("CA_CERTIFICATE", "");
    this.jwtSecret = this.getValue("JWT_SECRET", "secret");
    this.geminiApiKey = this.getValue("GEMINI_API_KEY", "");
  }

  private getValue(key: string, defaultValue: string) {
    const value = process.env[key];
    if (value) {
      return value;
    } else {
      return defaultValue;
    }
  }
}

export const settings = new Settings();
