from django.db import models
import datetime

class User(models.Model):
    google_id = models.CharField(max_length=30, primary_key=True)

    def __str__(self):
        return self.google_id

    def save(self, *args, **kwargs):
        return super(User, self).save(*args, **kwargs)

class Program(models.Model):
    title = models.CharField(max_length=10)
    description = models.CharField(max_length=155)
    created = models.DateTimeField()
    modified = models.DateTimeField()
    owner = models.ForeignKey(User)
    content = models.TextField()

    def __unicode__(self):
        return u'%s' % self.title

    def save(self, *args, **kwargs):
        if not self.id:
            self.created = datetime.datetime.now()
        self.modified = datetime.datetime.now()
        return super(Program, self).save(*args, **kwargs)

    class Meta:
        ordering = ['-modified']



