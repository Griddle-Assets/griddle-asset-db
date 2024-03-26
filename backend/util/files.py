from pathlib import Path
import shutil
from tempfile import NamedTemporaryFile
from fastapi import UploadFile


def save_upload_file_temp(upload_file: UploadFile) -> Path | None:
    if (upload_file.filename is None) or (upload_file.filename == ""):
        return None
    try:
        suffix = Path(upload_file.filename).suffix
        with NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            shutil.copyfileobj(upload_file.file, tmp)
            temp_path = Path(tmp.name)
    finally:
        upload_file.file.close()
    return temp_path
