import os
from os.path import join, dirname
from dotenv import load_dotenv

is_prod = os.environ.get("PRODUCTION") == "true"
is_dev = not is_prod

if is_dev:
    dotenv_path = join(dirname(__file__), ".env.development")
    load_dotenv(dotenv_path, override=False)
