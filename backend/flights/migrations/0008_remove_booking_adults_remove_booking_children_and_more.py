# Generated by Django 5.0.4 on 2024-05-22 11:38

import cloudinary_storage.storage
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flights', '0007_booking_passengers'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='adults',
        ),
        migrations.RemoveField(
            model_name='booking',
            name='children',
        ),
        migrations.RemoveField(
            model_name='booking',
            name='infants',
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('profile_photo', models.ImageField(blank=True, null=True, storage=cloudinary_storage.storage.MediaCloudinaryStorage, upload_to='profile/')),
                ('birth_date', models.DateField(blank=True, null=True)),
                ('phone', models.BigIntegerField(unique=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
