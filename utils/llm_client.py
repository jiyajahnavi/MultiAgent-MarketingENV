import os
import google.generativeai as genai

# Try loading env locally, but assume standard process loading works too
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

def _get_gemini_client():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("Warning: GEMINI_API_KEY is missing from environment variables.")
    genai.configure(api_key=api_key)
    return genai.GenerativeModel("gemini-1.5-flash")

# Singleton instantiation
gemini_model = _get_gemini_client()

def get_llm_response(prompt: str, provider: str = "gemini") -> str:
    """Wrapper to interact with the chosen LLM provider."""
    if provider == "gemini":
        try:
            response = gemini_model.generate_content(prompt)
            return response.text
        except Exception as e:
            print(f"Error querying Gemini: {e}")
            return "{}"
    elif provider == "openai":
        # Placeholder for OpenAI integration
        raise NotImplementedError("OpenAI integration not yet configured.")
    else:
        raise ValueError(f"Unknown LLM provider: {provider}")
