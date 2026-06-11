from pydantic import BaseModel


class OTPVerify(BaseModel):
    otp: str