FROM python:3.10-slim

WORKDIR /app

# Copy dependency definition
COPY pyproject.toml .
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy everything
COPY . .

# Expose the API port
EXPOSE 7860

# Start up server using module execution
CMD ["uvicorn", "server.app:app", "--host", "0.0.0.0", "--port", "7860"]
