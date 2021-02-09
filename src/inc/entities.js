export const dynamicEntities = [
    {
        _nav: {
            label: "Reports",
            icon : "people",
            url: "/reports/"
        },
        list: {
            title: "Reports",
            url: "/reports/",
            api_url: "/niloufar/countries",
        },
        create:{
            title: "New Report",
            url:"/reports/new/",
            api_url: "/niloufar/reports/form/",
            submitText: "Add new Report"
        }
    },
    {
        _nav: {
            label: "Countries",
            icon: "people",
            url: "/countries/"
        },
        list:{
            title: "Countries",
            url: "/countries/",
            api_url: "/niloufar/countries",
        },
        create:{
            title: "New Country",
            url:"/countries/new/",
            api_form_url: "/niloufar/countries/form",
            api_url: "/av1/countries",
            post_obj_name: 'country',
            submitText: "Add new Country"
        },
        detail:{
            linkLabel: "More",
            url: "/countries/:id/",
            api_url: "/niloufar/countries/:id/",
        }
    },
    {
        _nav: {
            label: "Cities",
            icon: "people",
            url: "/cities/"
        },
        list:{
            title: "Citites",
            url: "/cities/",
            api_url: "/niloufar/cities",
        },
        create:{
            title: "New City",
            url:"/cities/new/",
            api_form_url: "/niloufar/cities/form",
            api_url: "/av1/cities",
            post_obj_name: 'city',
            submitText: "Add new City"
        },
    }
]