# .Net Core + Angular + PostgreSQL + Docker



# Recommendations about Environment Variables

The best and most secure way to define environment variables in a Docker environment is to avoid exposing sensitive credentials directly in the `docker-compose.yml` file. Here are some recommended approaches:

### 1. **Use an `.env` File**  
`docker-compose` allows you to load environment variables from a separate `.env` file:

**Steps:**
1. **Create a `.env` file (in the same directory as `docker-compose.yml`)**:  
   ```ini
    # Environment
    ASPNETCORE_ENVIRONMENT=Development

    # PostgreSQL
    POSTGRES_DB=mydatabase
    POSTGRES_USER=myuser
    POSTGRES_PASSWORD=mypassword
    CONNECTION_STRING=Host=db;Database=mydatabase;Username=myuser;Password=mypassword

    # JWT
    JWT_KEY=your_secret_key_here
    JWT_ISSUER=your_issuer_here
    JWT_AUDIENCE=your_audience_here

   ```  
   
2. **Modify `docker-compose.yml` to load variables from the `.env` file**:  
   ```yaml
   services:
     api:
       build: .
       environment:
         - ASPNETCORE_ENVIRONMENT=${ASPNETCORE_ENVIRONMENT}
         - ConnectionStrings__DefaultConnection=${CONNECTION_STRING}
       depends_on:
         - db
     db:
       image: postgres:latest
       restart: always
       environment:
         POSTGRES_DB: ${POSTGRES_DB}
         POSTGRES_USER: ${POSTGRES_USER}
         POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
       volumes:
         - pgdata:/var/lib/postgresql/data
   volumes:
     pgdata:
   ```  

**Advantages:**  
✅ Prevents exposing credentials directly in `docker-compose.yml`  
✅ Makes configuration and versioning separate and easier  

**⚠️ Important:**  
- **Do not version the `.env` file** (add it to `.gitignore).  
- **Store credentials in a secret vault** like **AWS Secrets Manager**, **Vault**, or **Azure Key Vault** if necessary.  

---

### 2. **Use `docker secrets` (for Docker Swarm or Kubernetes)**  
If running in production with **Docker Swarm** or **Kubernetes**, using `docker secrets` is ideal:

1. **Create secrets**:  
   ```bash
   echo "mypassword" | docker secret create db_password -
   ```  
   
2. **Reference the secret in `docker-compose.yml`**:  
   ```yaml
   services:
     db:
       image: postgres:latest
       secrets:
         - db_password
   secrets:
     db_password:
       external: true
   ```  
   
3. **Inside the container, the secret will be available at `/run/secrets/db_password`.**  

**Advantages:**  
✅ Much more secure than environment variables  
✅ Prevents credentials from being exposed on the system  

---

### 3. **Use an External Secret Management System (Vault, AWS Secrets Manager, etc.)**  
In enterprise environments, the best practice is to use a dedicated secret management service:  
- **HashiCorp Vault**  
- **AWS Secrets Manager**  
- **Azure Key Vault**  
- **GCP Secret Manager**  

Usually, the app will fetch credentials from the secret manager **at runtime**, avoiding storing them in local files.  

---

### **Summary**
| Method | Security | Ease of Use |
|--------|----------|-------------|
| `.env` | Medium (as long as it's not versioned) | Easy |
| `docker secrets` | High (does not expose in the environment) | Medium |
| Secret Manager | Very High | Requires extra setup |

For **development environments**, using the `.env` file works well. For **production environments**, using `docker secrets` or a **secret manager** is the best practice. 🚀


## Commands for Docker Secrets

```shell
echo "Production" | docker secret create aspnetcore_environment -
echo "prd_db" | docker secret create postgres_db -
echo "prd_user" | docker secret create postgres_user -
echo "prd_password" | docker secret create postgres_password -
echo "Host=db;Database=prd_db;Username=prd_user;Password=prd_password" | docker secret create connection_string -
```