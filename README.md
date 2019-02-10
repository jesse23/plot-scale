[![Build Status](https://travis-ci.org/jesse23/plot-scale.svg?branch=master)](https://travis-ci.org/jesse23/plot-scale)
# Plot Scale

How can we translate:

```javascript
{
    "name": "George Washington",
    "birthday": "February 22, 1732",
    "address": "Mount Vernon, Virginia, United States"
}
```

to

```json
{
    "first_name": "George",
    "last_name": "Washington",
    "birthday": "1732-02-22",
    "address": {
        "street_address": "3200 Mount Vernon Memorial Highway",
        "city": "Mount Vernon",
        "state": "Virginia",
        "country": "United States"
    }
}
```

in easy way?
