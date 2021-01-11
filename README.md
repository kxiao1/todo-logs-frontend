# Todo-logs (Frontend)

Displays to-do's for a particular day or week (past, present, or future (?)) with the help of a datepicker. Toggle between daily and weekly modes with a switch, and add/edit with a no-frills form.

## Usage
* First install ``ReactJS`` and ``npm``.
* Then run ``npm install`` to install all packages and dependencies.
* Create a ``src/constants.js`` file. This file should export the following constants which depend on your backend settings:
    * An enum-like object ``modes = {daily: xx, weekly: yy}`` representing daily vs weekly mode, e.g. ``modes = { daily: 0, weekly: 1 }``
    * ``serverAdd``, the address where the backend API handles HTTP requests
    * ``authAdd``, the address to get a new JSON Web Token
    * ``user``, an object containing login credentials, e.g. ``user = { username: xxxx, password: yyyy }``
* Remove or modify the ``homepage`` in ``package.json``.
* (Optional) Change the favicons, set up tests, etc.

## Credits
<https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react>