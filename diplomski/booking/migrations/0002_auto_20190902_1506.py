# Generated by Django 2.2.4 on 2019-09-02 13:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('booking', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Destinacija',
            fields=[
                ('iddestinacija', models.AutoField(primary_key=True, serialize=False)),
                ('drzava', models.CharField(blank=True, max_length=45, null=True)),
                ('grad', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'destinacija',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Korisnik',
            fields=[
                ('idkorisnik', models.AutoField(primary_key=True, serialize=False)),
                ('korisnickoime', models.CharField(blank=True, max_length=45, null=True)),
                ('email', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'korisnik',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Ocena',
            fields=[
                ('idocena', models.AutoField(primary_key=True, serialize=False)),
                ('ocena', models.IntegerField(blank=True, null=True)),
                ('komentar', models.CharField(blank=True, max_length=200, null=True)),
            ],
            options={
                'db_table': 'ocena',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Osoba',
            fields=[
                ('idosoba', models.AutoField(primary_key=True, serialize=False)),
                ('datumrodjenja', models.DateField(blank=True, null=True)),
                ('ime', models.CharField(blank=True, max_length=45, null=True)),
                ('prezime', models.CharField(blank=True, max_length=45, null=True)),
                ('aboutme', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'db_table': 'osoba',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Rezervacija',
            fields=[
                ('idrezervacija', models.AutoField(primary_key=True, serialize=False)),
                ('datumprijave', models.DateField(blank=True, null=True)),
                ('datumodjave', models.DateField(blank=True, null=True)),
                ('cenarezervacije', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'rezervacija',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Smestaj',
            fields=[
                ('idsmestaj', models.AutoField(primary_key=True, serialize=False)),
                ('brojsoba', models.IntegerField(blank=True, null=True)),
                ('opis', models.CharField(blank=True, max_length=250, null=True)),
                ('brojkreveta', models.IntegerField(blank=True, null=True)),
                ('parking', models.IntegerField(blank=True, null=True)),
                ('cenanocenja', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'smestaj',
                'managed': False,
            },
        ),
        migrations.DeleteModel(
            name='Direktor',
        ),
        migrations.DeleteModel(
            name='Sastanak',
        ),
    ]
