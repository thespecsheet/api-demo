# api-demo

Specsheet Api demo

* Demonstrates use of the openapi api.json

# Contents

* `tss-api.json`   -   OpenAPI definition of the TSS API.    Also available on https://app.thespecsheet.com/api.json
Also read https://specsheet.uat2.hx-specsheet.com/api/swagger/

* `tss-api.ts`     -   Generated typescript interfaces for the API

* `tss-api-service.ts` - Convenience wrapper to help/demonstrate how to call the API

* `demo-api.ts`    - End to end demo just replace `getCampaignsPlacementsBookings()` in order to obtain your data


# Setup/Install

Run `yarn` to install dependencies

# Authentication

Obtain a `.env` file from TSS, place here in `./.env`

# Run demo

`yarn demo-api`


