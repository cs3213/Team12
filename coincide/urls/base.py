from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.views.generic import TemplateView
from tastypie.api import Api
from coincide import resources

admin.autodiscover()

v1_api = Api(api_name='v1')
v1_api.register(resources.UserResource())
v1_api.register(resources.ProgramResource())

urlpatterns = patterns('',
    # Home Page -- Replace as you prefer
    url(r'^$', 'coincide.views.home', name='home'),
    url(r'^user/$', 'coincide.views.add_user'),
    url(r'^create/$', 'coincide.views.add_program'),
    url(r'^read_program/$', 'coincide.views.view_program'),
    url(r'^update/$', 'coincide.views.update_program'),
    url(r'^delete/$', 'coincide.views.delete_program'),
    url(r'^all/$', 'coincide.views.all'),
    url(r'^last_modified/$', 'coincide.views.load_last_modified'),
    url('', include('django.contrib.auth.urls', namespace='auth')),
    url('', include('social.apps.django_app.urls', namespace='social')),
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', include(admin.site.urls)),
    (r'^api/', include(v1_api.urls)),
)
