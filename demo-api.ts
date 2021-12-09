/// Demonstrate usage of the API
import {config} from './config';
import { ApiService } from './tss-api-service';

import * as api from './tss-api';

type CampaignsPlacementsBookings = api.components["schemas"]['BatchUpdateReq'];
type TssCampaign = api.components["schemas"]["ApiCampaign"];
type TssPlacement = api.components["schemas"]["ApiPlacement"];
type TssBooking = api.components["schemas"]["ApiBooking"];

function makeSampleCampaignPlacementsBookings() : CampaignsPlacementsBookings {

  const campaign : TssCampaign = {
    campaignIdentifier: 'AcmeRebranding2022',
    client: 'Acme',
    campaignName: "Acme Corp Rebranding 2022"
  };

  const placements : TssPlacement[] = [
    {
      identifier: "PANEL-XYZ-123",
      name: "Panel xyz 123",
      description: "Panel xyz 123",
      category: "PRINT_OOH",
      originalSpecs: [
        {
          data: {url:"http://example.orig.spec.url"}
        }
      ],
      images: [
        {
          data: {url:"http://example.orig.spec.url/image.png"}
        }
      ],
      documents: [
        {
          data: {url:"http://example.orig.spec.url/spec.pdf"}
        }
      ],
      location: {
        siteNumber: "site-123",
        direction: "northbound",
        address: "123 Jones St",
        suburb: "Sydney",
        postcode: "2000",
        state: "NSW",
        country: "Australia"
      },
      specifications: {     // Detailed placement specifications are in here.
        components: [
          {
            value: {
              // See typescript types for full spec schema.
              printOOH: {
                artworkDimension: {
                  value: {
                    visualSize: {
                      value: {
                        width: {
                          value: 740,
                          unit: 'cm'
                        },
                        height: {
                          value: 630,
                          unit: 'cm'
                        }
                      }
                    },
                    finishSize: {
                      value: {
                        width: {
                          value: 750,
                          unit: 'cm'
                        },
                        height: {
                          value: 640,
                          unit: 'cm'
                        }
                      }
                    },
                  }
                },
                illumination: {
                  value: {
                    backlit: {}
                  }
                }
              }
            }
          }
        ]
      },
      isDraft: false,
      isVerified: true,
      isDeprecated: false,
      activeStart: "2010-01-01",
      activeEnd: "2025-01-01",  // or null
      publicSearchable: false,  // not public searchable - only findable through search by contract/campaign code, client name & media owner name
      attributes: [
        {
          name: "Prohibitions",
          value: "* No gambling\n* No alcohol"
        }
      ],
      version: 1,
      //  lastVerified: "2021-12-09", TODO: remove from api
    },

    {
      identifier: "DIGITALPANEL-XYZ-456",
      name: "Digital Panel xyz 123",
      description: "Panel xyz 123",
      category: "DOOH",
      originalSpecs: [
        {
          data: {url:"http://example.orig.spec.url2"}
        }
      ],
      images: [
        {
          data: {url:"http://example.orig.spec.url2/image.png"}
        }
      ],
      documents: [
        {
          data: {url:"http://example.orig.spec.url2/spec.pdf"}
        }
      ],
      location: {
        siteNumber: "site-456",
        direction: "southbound",
        address: "456 Mark St",
        suburb: "Sydney",
        postcode: "2001",
        state: "NSW",
        country: "Australia"
      },
      specifications: {     // Detailed placement specifications are in here.
        components: [
          {
            value: {
              // See typescript types for full spec schema.
              digitalStatic: {
                dimensions: {
                  value: [    // allowable dimension values:
                    {
                      value: {
                        pixelDimension: {
                          width: 1920,
                          height: 1080
                        }
                      }
                    },
                    {
                      value: {
                        pixelDimension: {
                          width: 1024,
                          height: 768
                        }
                      }
                    }
                  ]
                },
                formats: {
                  value: {
                    jpg: {},
                    bmp: {},
                    gif: {},
                    png: {
                      transparency: null,
                    },
                    eps: {},
                    ai: {},
                    tiff: {},
                    psdLayered: {},
                    psdFlattened: {
                      psdExampleUrl: "http://example.psd.file.url",
                    },
                    svg: {},
                    other: [
                      {
                        value: "somethingelse"
                      }
                    ]
                  }
                }
              }
            }
          }
        ]
      },
      isDraft: false,
      isVerified: true,
      isDeprecated: false,
      activeStart: "2010-01-01",
      activeEnd: "2025-01-01",  // or null
      publicSearchable: false,  // not public searchable - only findable through search by contract/campaign code, client name & media owner name
      attributes: [
        {
          name: "Prohibitions",
          value: "* No gambling\n* No alcohol"
        }
      ],
      version: 1,
      //  lastVerified: "2021-12-09", TODO: remove from api
    }
  ];

  const bookings : TssBooking[] = [
    {
      bookingIdentifier: "xx-123",
      placementIdentifier: "PANEL-XYZ-123",
      campaignIdentifier: "AcmeRebranding2022",
      liveDate: "2022-01-01",
      endDate: "2022-02-01"
    },
    {
      bookingIdentifier: "xyz-456",
      placementIdentifier: "DIGITALPANEL-XYZ-456",
      campaignIdentifier: "AcmeRebranding2022",
      liveDate: "2022-01-01",
      endDate: "2022-02-01"
    }
  ];

  return {
    placements,
    bookings,
    campaigns: [campaign]
  }
}

async function main() {
  const cfg = config();
  const apiService = new ApiService({authToken: cfg.TSS_AUTHKEY, url: cfg.TSS_SERVER});

  const sampleData = makeSampleCampaignPlacementsBookings();

  const resp = await apiService.batchUpdate({
    reqId: 'req-uuid-123132',
    ...sampleData
  });
  if(resp !== 'success') {
    throw new Error(JSON.stringify(resp));
  }

  console.log('success');
}

main().catch(err=>console.error(err));
