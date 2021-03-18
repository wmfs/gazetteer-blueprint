/* eslint-env mocha */
const chai = require('chai')
const expect = chai.expect
const gazetteerAddress = require('../functions/utils/gazetteer-address')

describe('extract address for gazetteer', () => {
  describe('addresses', () => {
    const tests = [
      ['address with organisation',
        {
          rmOrganisationName: null,
          laOrganisation: 'organisation',
          legalName: null,
          saoStartNumber: '1',
          saoStartSuffix: 'A',
          saoEndNumber: '2',
          saoEndSuffix: 'B',
          saoText: 'hello you!',
          paoStartNumber: '121',
          paoStartSuffix: null,
          paoEndNumber: null,
          paoEndSuffix: null,
          paoText: null,
          streetDescription: 'ALPHINGTON ROAD',
          locality: null,
          postTown: 'EXETER',
          townName: 'EXETER',
          postcode: 'EX2 8JD'
        },
        {
          businessName: 'organisation',
          buildingName: 'hello you! 1A-2B',
          buildingNumber: '121',
          streetName1: 'ALPHINGTON ROAD',
          streetName2: null,
          areaName1: null,
          areaName2: 'EXETER',
          postTown: 'EXETER',
          postCode: 'EX2 8JD'
        }
      ],
      [
        'sao start and end numbers, pao text',
        {
          rmOrganisationName: 'THE WREKIN HOUSING TRUST',
          laOrganisation: null,
          legalName: null,
          saoStartNumber: '5',
          saoStartSuffix: null,
          saoEndNumber: '6',
          saoEndSuffix: null,
          saoText: null,
          paoStartNumber: null,
          paoStartSuffix: null,
          paoEndNumber: null,
          paoEndSuffix: null,
          paoText: 'HORSESHOES COURT',
          buildingNumber: null,
          streetDescription: 'HIGH STREET',
          locality: 'MADELEY',
          postTown: 'TELFORD',
          townName: 'TELFORD',
          postcode: 'TF7 5BG'
        },
        {
          businessName: 'THE WREKIN HOUSING TRUST',
          buildingName: '5-6 HORSESHOES COURT',
          buildingNumber: null,
          streetName1: 'HIGH STREET',
          streetName2: null,
          areaName1: null,
          areaName2: 'MADELEY',
          postTown: 'TELFORD',
          postCode: 'TF7 5BG'
        }
      ],
      [
        'pao text matches dependent thoroughfare',
        {
          rmOrganisationName: null,
          laOrganisation: null,
          legalName: null,
          saoStartNumber: '1',
          saoStartSuffix: null,
          saoEndNumber: null,
          saoEndSuffix: null,
          saoText: null,
          paoStartNumber: null,
          paoStartSuffix: null,
          paoEndNumber: null,
          paoEndSuffix: null,
          paoText: 'FAIRVIEW PARK',
          buildingName: null,
          dependentThoroughfare: 'FAIRVIEW PARK',
          streetDescription: 'STATION ROAD',
          locality: 'WRENBURY',
          postTown: 'NANTWICH',
          townName: 'NANTWICH',
          postcode: 'CW5 8HR'
        },
        {
          businessName: null,
          buildingName: null,
          buildingNumber: '1',
          streetName1: 'FAIRVIEW PARK',
          streetName2: 'STATION ROAD',
          areaName1: null,
          areaName2: 'WRENBURY',
          postTown: 'NANTWICH',
          postCode: 'CW5 8HR'
        }
      ],
      [
        'sao text and pao text, no delivery point address',
        {
          rmOrganisationName: null,
          laOrganisation: null,
          legalName: null,
          saoStartNumber: null,
          saoStartSuffix: null,
          saoEndNumber: null,
          saoEndSuffix: null,
          saoText: 'STEWARDS RESIDENCE',
          paoStartNumber: null,
          paoStartSuffix: null,
          paoEndNumber: null,
          paoEndSuffix: null,
          paoText: 'LADBROOK PARK GOLF CLUB',
          buildingNumber: null,
          dependentThoroughfare: null,
          streetDescription: 'POOLHEAD LANE',
          locality: null,
          postTown: null,
          townName: 'TANWORTH-IN-ARDEN',
          postcode: null
        },
        {
          businessName: null,
          buildingName: 'STEWARDS RESIDENCE, LADBROOK PARK GOLF CLUB',
          buildingNumber: null,
          streetName1: 'POOLHEAD LANE',
          streetName2: null,
          areaName1: null,
          areaName2: 'TANWORTH-IN-ARDEN',
          postTown: 'TANWORTH-IN-ARDEN',
          postCode: null
        }
      ],
      [
        'sao text and pao number',
        {
          rmOrganisationName: null,
          laOrganisation: null,
          legalName: null,
          saoStartNumber: null,
          saoStartSuffix: null,
          saoEndNumber: null,
          saoEndSuffix: null,
          saoText: 'FLAT 2',
          paoStartNumber: '79',
          paoStartSuffix: null,
          paoEndNumber: null,
          paoEndSuffix: null,
          paoText: null,
          dependentThoroughfare: null,
          streetDescription: 'EARLSWOOD COMMON',
          dependentLocality: 'EARLSWOOD',
          locality: null,
          postTown: 'SOLIHULL',
          townName: 'EARLSWOOD',
          postcode: 'B94 5SJ'
        },
        {
          businessName: null,
          buildingName: 'FLAT 2',
          buildingNumber: '79',
          streetName1: 'EARLSWOOD COMMON',
          streetName2: null,
          areaName1: null,
          areaName2: 'EARLSWOOD',
          postTown: 'SOLIHULL',
          postCode: 'B94 5SJ'
        }
      ],
      [
        'double dependent locality',
        {
          rmOrganisationName: null,
          laOrganisation: null,
          legalName: null,
          saoStartNumber: null,
          saoStartSuffix: null,
          saoEndNumber: null,
          saoEndSuffix: null,
          saoText: null,
          paoStartNumber: null,
          paoStartSuffix: null,
          paoEndNumber: null,
          paoEndSuffix: null,
          paoText: 'COPPICE HOUSE',
          dependentThoroughfare: null,
          buildingNumber: null,
          streetDescription: 'DOG IN LANE',
          doubleDependentLocality: 'HUNTINGDON',
          dependentLocality: 'LITTLE WENLOCK',
          locality: 'LITTLE WENLOCK',
          postTown: 'TELFORD',
          townName: 'TELFORD',
          postcode: 'TF6 5BW'
        },
        {
          businessName: null,
          buildingName: 'COPPICE HOUSE',
          buildingNumber: null,
          streetName1: 'DOG IN LANE',
          streetName2: null,
          areaName1: 'HUNTINGDON',
          areaName2: 'LITTLE WENLOCK',
          postTown: 'TELFORD',
          postCode: 'TF6 5BW'
        }
      ],
      [
        'org name duplicated in saoText',
        {
          rmOrganisationName: 'STRANGE STRANGE & GARDNER',
          laOrganisation: null,
          legalName: null,
          saoStartNumber: null,
          saoStartSuffix: null,
          saoEndNumber: null,
          saoEndSuffix: null,
          saoText: 'STRANGE STRANGE & GARDNER',
          paoStartNumber: null,
          paoStartSuffix: null,
          paoEndNumber: null,
          paoEndSuffix: null,
          paoText: 'FAIRGATE HOUSE',
          buildingNumber: null,
          dependentThoroughfare: null,
          streetDescription: 'KINGS ROAD',
          doubleDependentLocality: '',
          dependentLocality: 'TYSELEY',
          locality: null,
          postTown: 'BIRMINGHAM',
          townName: 'BIRMINGHAM',
          postcode: 'B11 2AA'
        },
        {
          businessName: 'STRANGE STRANGE & GARDNER',
          buildingName: 'FAIRGATE HOUSE',
          buildingNumber: null,
          streetName1: 'KINGS ROAD',
          streetName2: null,
          areaName1: null,
          areaName2: 'TYSELEY',
          postTown: 'BIRMINGHAM',
          postCode: 'B11 2AA'
        }
      ],
      [
        'No number in pao and sao, only in delivery point address',
        {
          rmOrganisationName: 'STRANGE STRANGE & GARDNER',
          laOrganisation: null,
          legalName: null,
          saoStartNumber: null,
          saoStartSuffix: null,
          saoEndNumber: null,
          saoEndSuffix: null,
          saoText: 'POOP',
          paoStartNumber: null,
          paoStartSuffix: null,
          paoEndNumber: null,
          paoEndSuffix: null,
          paoText: 'FAIRGATE HOUSE',
          buildingNumber: '205',
          dependentThoroughfare: null,
          streetDescription: 'KINGS ROAD',
          doubleDependentLocality: '',
          dependentLocality: 'TYSELEY',
          locality: null,
          postTown: 'BIRMINGHAM',
          townName: 'BIRMINGHAM',
          postcode: 'B11 2AA'
        },
        {
          businessName: 'STRANGE STRANGE & GARDNER',
          buildingName: 'POOP, FAIRGATE HOUSE',
          buildingNumber: '205',
          streetName1: 'KINGS ROAD',
          streetName2: null,
          areaName1: null,
          areaName2: 'TYSELEY',
          postTown: 'BIRMINGHAM',
          postCode: 'B11 2AA'
        }
      ],
      [
        'Org name duplicated in paoText',
        {
          rmOrganisationName: 'BRITISH BROADCASTING CORPORATION',
          laOrganisation: null,
          legalName: null,
          saoStartNumber: null,
          saoStartSuffix: null,
          saoEndNumber: null,
          saoEndSuffix: null,
          saoText: null,
          paoStartNumber: null,
          paoStartSuffix: null,
          paoEndNumber: null,
          paoEndSuffix: null,
          paoText: 'BRITISH BROADCASTING CORPORATION',
          buildingName: 'THE MAILBOX',
          buildingNumber: null,
          dependentThoroughfare: null,
          streetDescription: 'WHARFSIDE STREET',
          doubleDependentLocality: null,
          dependentLocality: null,
          locality: null,
          postTown: 'BIRMINGHAM',
          townName: 'BIRMINGHAM',
          postcode: 'B1 1AY'
        },
        {
          businessName: 'BRITISH BROADCASTING CORPORATION',
          buildingName: 'THE MAILBOX',
          buildingNumber: null,
          streetName1: 'WHARFSIDE STREET',
          streetName2: null,
          areaName1: null,
          areaName2: 'BIRMINGHAM',
          postTown: 'BIRMINGHAM',
          postCode: 'B1 1AY'
        }
      ],
      [
        'Dependent thoroughfare matches street description',
        {
          buildingNumber: 1,
          buildingName: null,
          dependentThoroughfare: 'LOCK KEEPERS REACH',
          thoroughfare: 'WITHYBED LANE',
          doubleDependentLocality: 'WITHYBED GREEN',
          dependentLocality: 'ALVECHURCH',
          postTown: 'BIRMINGHAM',
          postcode: 'B48 7RF',
          streetDescription: 'LOCK KEEPERS REACH',
          townName: 'ALVECHURCH',
          administrativeArea: 'WORCESTERSHIRE'
        },
        {
          businessName: null,
          buildingName: null,
          buildingNumber: 1,
          streetName1: 'LOCK KEEPERS REACH',
          streetName2: 'WITHYBED LANE',
          areaName1: 'WITHYBED GREEN',
          areaName2: 'ALVECHURCH',
          postTown: 'BIRMINGHAM',
          postCode: 'B48 7RF'
        }
      ]
    ]

    for (const [label, addressbase, gazetteer] of tests) {
      it(label, () =>
        expect(gazetteerAddress(addressbase)).to.be.eql(gazetteer)
      )
    }
  })

  describe('business name', () => {
    const orgNameTests = [
      [
        'royal mail organisation',
        {
          rmOrganisationName: 'Royal Mail Sourced Org Name',
          laOrganisation: 'Local Authority Sourced Org Name',
          legalName: 'Legal Name'
        },
        'Royal Mail Sourced Org Name'
      ],
      [
        'local auth organisation',
        {
          rmOrganisationName: null,
          laOrganisation: 'Local Authority Sourced Org Name',
          legalName: 'Legal Name'
        },
        'Local Authority Sourced Org Name'
      ],
      [
        'legal name',
        {
          rmOrganisationName: null,
          laOrganisation: null,
          legalName: 'Legal Name'
        },
        'Legal Name'
      ]
    ]

    for (const [label, addressbase, orgName] of orgNameTests) {
      it(label, () =>
        expect(gazetteerAddress(addressbase).businessName).to.be.eql(orgName)
      )
    }
  }) // orgNames
})
