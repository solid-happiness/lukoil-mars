from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator


class Profile(AbstractUser):
    PHONE_VALIDATOR = RegexValidator(
        regex=r'^\+?1?\d{9,15}$',
    )
    phone_number = models.CharField(
        'Номер телефона',
        validators=[PHONE_VALIDATOR],
        max_length=17,
        blank=True
    )
    photo = models.ImageField(
        'Фотография',
        upload_to='users',
        null=True,
        blank=True,
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.get_full_name() or self.username,
            "img": str(self.photo) and self.photo.url,
        }

    def __str__(self):
        return str(self.username)

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
