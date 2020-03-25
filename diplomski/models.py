# # This is an auto-generated Django model module.
# # You'll have to do the following manually to clean this up:
# #   * Rearrange models' order
# #   * Make sure each model has one field with primary_key=True
# #   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
# #   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# # Feel free to rename the models, but don't rename db_table values or field names.
# from django.db import models


# class AuthGroup(models.Model):
#     name = models.CharField(unique=True, max_length=150)

#     class Meta:
#         managed = False
#         db_table = 'auth_group'


# class AuthGroupPermissions(models.Model):
#     group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
#     permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

#     class Meta:
#         managed = False
#         db_table = 'auth_group_permissions'
#         unique_together = (('group', 'permission'),)


# class AuthPermission(models.Model):
#     name = models.CharField(max_length=255)
#     content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
#     codename = models.CharField(max_length=100)

#     class Meta:
#         managed = False
#         db_table = 'auth_permission'
#         unique_together = (('content_type', 'codename'),)


# class AuthUser(models.Model):
#     password = models.CharField(max_length=128)
#     last_login = models.DateTimeField(blank=True, null=True)
#     is_superuser = models.IntegerField()
#     username = models.CharField(unique=True, max_length=150)
#     first_name = models.CharField(max_length=30)
#     last_name = models.CharField(max_length=150)
#     email = models.CharField(max_length=254)
#     is_staff = models.IntegerField()
#     is_active = models.IntegerField()
#     date_joined = models.DateTimeField()

#     class Meta:
#         managed = False
#         db_table = 'auth_user'


# class AuthUserGroups(models.Model):
#     user = models.ForeignKey(AuthUser, models.DO_NOTHING)
#     group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

#     class Meta:
#         managed = False
#         db_table = 'auth_user_groups'
#         unique_together = (('user', 'group'),)


# class AuthUserUserPermissions(models.Model):
#     user = models.ForeignKey(AuthUser, models.DO_NOTHING)
#     permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

#     class Meta:
#         managed = False
#         db_table = 'auth_user_user_permissions'
#         unique_together = (('user', 'permission'),)


# class Destinacija(models.Model):
#     iddestinacija = models.AutoField(primary_key=True)
#     drzava = models.CharField(max_length=45, blank=True, null=True)
#     grad = models.CharField(max_length=45, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'destinacija'


# class DjangoAdminLog(models.Model):
#     action_time = models.DateTimeField()
#     object_id = models.TextField(blank=True, null=True)
#     object_repr = models.CharField(max_length=200)
#     action_flag = models.PositiveSmallIntegerField()
#     change_message = models.TextField()
#     content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
#     user = models.ForeignKey(AuthUser, models.DO_NOTHING)

#     class Meta:
#         managed = False
#         db_table = 'django_admin_log'


# class DjangoContentType(models.Model):
#     app_label = models.CharField(max_length=100)
#     model = models.CharField(max_length=100)

#     class Meta:
#         managed = False
#         db_table = 'django_content_type'
#         unique_together = (('app_label', 'model'),)


# class DjangoMigrations(models.Model):
#     app = models.CharField(max_length=255)
#     name = models.CharField(max_length=255)
#     applied = models.DateTimeField()

#     class Meta:
#         managed = False
#         db_table = 'django_migrations'


# class DjangoSession(models.Model):
#     session_key = models.CharField(primary_key=True, max_length=40)
#     session_data = models.TextField()
#     expire_date = models.DateTimeField()

#     class Meta:
#         managed = False
#         db_table = 'django_session'


# class Korisnik(models.Model):
#     idkorisnik = models.AutoField(primary_key=True)
#     idosoba = models.ForeignKey('Osoba', models.DO_NOTHING, db_column='idosoba', blank=True, null=True)
#     korisnickoime = models.CharField(max_length=45, blank=True, null=True)
#     email = models.CharField(max_length=45, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'korisnik'


# class Ocena(models.Model):
#     idocena = models.AutoField(primary_key=True)
#     ocena = models.IntegerField(blank=True, null=True)
#     komentar = models.CharField(max_length=200, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'ocena'


# class Osoba(models.Model):
#     idosoba = models.AutoField(primary_key=True)
#     datumrodjenja = models.DateField(blank=True, null=True)
#     ime = models.CharField(max_length=45, blank=True, null=True)
#     prezime = models.CharField(max_length=45, blank=True, null=True)
#     aboutme = models.CharField(max_length=100, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'osoba'


# class Rezervacija(models.Model):
#     idrezervacija = models.AutoField(primary_key=True)
#     idkorisnik = models.ForeignKey(Korisnik, models.DO_NOTHING, db_column='idkorisnik', blank=True, null=True)
#     idsmestaj = models.ForeignKey('Smestaj', models.DO_NOTHING, db_column='idsmestaj', blank=True, null=True)
#     datumprijave = models.DateField(blank=True, null=True)
#     idocena = models.ForeignKey(Ocena, models.DO_NOTHING, db_column='idocena', blank=True, null=True)
#     datumodjave = models.DateField(blank=True, null=True)
#     cenarezervacije = models.IntegerField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'rezervacija'


# class Smestaj(models.Model):
#     idsmestaj = models.AutoField(primary_key=True)
#     iddestinacija = models.ForeignKey(Destinacija, models.DO_NOTHING, db_column='iddestinacija', blank=True, null=True)
#     brojsoba = models.IntegerField(blank=True, null=True)
#     opis = models.CharField(max_length=250, blank=True, null=True)
#     brojkreveta = models.IntegerField(blank=True, null=True)
#     parking = models.IntegerField(blank=True, null=True)
#     cenanocenja = models.IntegerField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'smestaj'
