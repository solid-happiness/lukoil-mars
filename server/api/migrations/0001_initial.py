# Generated by Django 3.1.7 on 2021-03-27 06:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='EmulationConfig',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fuel_supplies', models.JSONField(verbose_name='Распределение поставок по месяцам')),
                ('month_timestamp_count', models.PositiveIntegerField(verbose_name='количество условных единиц в месяце')),
                ('tanker_cost', models.PositiveIntegerField(verbose_name='тоимость покупки танкера для перевозки топлива')),
                ('fuel_delivery_time', models.PositiveIntegerField(verbose_name='время доставки топлива до заправочной станции')),
                ('car_refueling_time', models.PositiveIntegerField(verbose_name='время заправки одного автомобиля')),
                ('base_avg_receipt', models.PositiveIntegerField(verbose_name='базовый средний чек на заправочной станции')),
                ('receipt_avg_coef', models.FloatField(verbose_name='коэффициент увеличения среднего чека')),
                ('maintenance_station_cost', models.PositiveIntegerField(verbose_name='Стоимость обслуживания заправочной станции')),
                ('maintenance_column_cost', models.PositiveIntegerField(verbose_name='Стоимость обслуживания колонки')),
                ('station_building_time', models.PositiveIntegerField(verbose_name='время постройки заправочной станции')),
                ('column_building_time', models.PositiveIntegerField(verbose_name='время постройки заправочной колонки')),
                ('director_salary', models.PositiveIntegerField(verbose_name='зарплата директора')),
                ('refuiller_salary', models.PositiveIntegerField(verbose_name='зарплата заправщика')),
                ('cashier_salary', models.PositiveIntegerField(verbose_name='зарплата кассира')),
                ('security_salary', models.PositiveIntegerField(verbose_name='зарплата охранника')),
                ('need_additional_cashier_column_count', models.PositiveIntegerField(help_text='количество заправочных колонок, при котором необходимо нанять дополнительного кассира')),
                ('dismissal_probability', models.FloatField(verbose_name='Вероятность увольнения')),
            ],
        ),
        migrations.CreateModel(
            name='Emulation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('snapshots', models.JSONField()),
                ('config', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.emulationconfig')),
            ],
        ),
    ]
