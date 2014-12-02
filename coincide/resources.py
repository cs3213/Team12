from tastypie.resources import fields
from tastypie.resources import ModelResource

from coincide import models


class UserResource(ModelResource):
    class Meta:
        queryset = models.User.objects.all()
        allowed_methods = ['get']
        always_return_data = True
        fields = ['google_id']


class ProgramResource(ModelResource):
    owner_id = fields.ForeignKey(UserResource, 'owner')

    class Meta:
        queryset = models.Program.objects.all()
        allowed_methods = ['get']
        always_return_data = True