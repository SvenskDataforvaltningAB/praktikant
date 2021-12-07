export interface Facility {
  name: string;
}

export enum IssueStatus {
  denied, reported, taken, ongoing, finished, billed, closed, unknown
}

export interface FacilityResponse {
  items: [
    {
      id: string;
      customer: {
        id: string;
        number: string;
        name: string;
        categories: [
          {
            id: string;
            name: string;
            color: string;
          }
        ];
        contacts: [
          {
            active: boolean;
            note: string;
            profession: string;
            changeDate: Date;
            email: string;
            birthdate: Date;
            homeAddress: string;
            hometown: string;
            homeZipcode: string;
            homePhonenumber: string;
            id: string;
            cellPhonenumber: string;
            name: string;
            phonenumber: string;
            categories: string;
            employee: true;
            socSecurityNumber: string;
            extId: "string";
            mailConsent: true;
            customers: [null];
          }
        ];
        facilitiesCount: number;
        facilities: [];
        facilitiesInvoicing: [];
        branches: [
          {
            id: string;
            name: string;
            address: {
              line1: string;
              line2: string;
              city: string;
              country: string;
              postalCode: string;
            };
            phonenumber: string;
            orgNumber: string;
            email: string;
            website: string;
            documents: [
              {
                id: string;
                name: string;
                extension: string;
                path: string;
              }
            ];
          }
        ];
        documents: [
          {
            id: string;
            name: string;
            extension: string;
            path: string;
          }
        ];
        note: string;
        paymentTerms: number;
        deliveryTerms: string;
        delayInterestRate: number;
        email: string;
        website: string;
        orgNumber: string;
        visitingAddress: string;
        searchTerm: string;
        phonenumber: string;
        warning: string;
        private: true;
        active: true;
        vatNumber: string;
        reverseTax: true;
        collectiveInvoice: true;
        emailInvoice: string;
        gln: string;
        extId: string;
        currencyCode: string;
        countryCode: string;
        language: string;
        prospect: true;
      };
      name: string;
      number: string;
      active: true;
      buyerNumber: string;
      warning: true;
      warningText: string;
      propertyDesignation: string;
      orgNumber: string;
      vehicle: string;
      categories: [
        {
          id: string;
          name: string;
          color: string;
        }
      ];
      workObjects: [
        {
          id: string;
          number: string;
          serialNumber: string;
          name: "string";
          note: "string";
          installationDate: Date;
          warrantyDate: Date;
          inspectionDate: Date;
          manufactureName: "string";
          provides: "string";
          placement: "string";
          dismantleDate: Date;
          typeName: "string";
          active: true;
          rentalObject: true;
          categories: [
            {
              id: "string";
              name: "string";
              color: "string";
            }
          ];
          components: [
            {
              id: string;
              quantity: number;
              name: string;
              designation: string;
              changeDate: Date;
              manufactureName: string;
              note: string;
              objectId: string;
              row: number;
              sparePart: true;
              type: number;
              createdDate: Date;
              finishDate: Date;
            }
          ];
        }
      ];
      documents: [
        {
          id: string;
          name: string;
          extension: string;
          path: string;
        }
      ];
      contacts: [
        {
          active: boolean;
          note: string;
          profession: string;
          changeDate: Date;
          email: string;
          birthdate: Date;
          homeAddress: string;
          hometown: string;
          homeZipcode: string;
          homePhonenumber: string;
          id: string;
          cellPhonenumber: string;
          name: "string";
          phonenumber: string;
          categories: string;
          employee: true;
          socSecurityNumber: string;
          extId: string;
          mailConsent: true;
          customers: [];
        }
      ];
      externalReferenceNumber: string;
      notes: string;
      customString1: string;
      isMobile: boolean;
    }
  ];
  nextLink: string;
}

export interface AuthRequest {
  username: string;
  password: string;
  grant_type: string;
  client_id: string;
}

export interface AuthResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token: string;
  scope: string;
}

export interface ReAuthRequest {
  refresh_token: string;
  grant_type: string;
  client_id: string;
}

export interface ZData {
  key: string;
  value: string;
  created: number;
  expires: number;
}

/**A version of Zucchini Data that makes the expiration and creation date Date objects. */
export interface DZData {
  key: string;
  value: string;
  creationDate: Date;
  expirationDate: Date;
}

export interface IssuesResponse {
  items: [
    {
      id: "string";
      orderId: "string";
      orderNumber: "string";
      orderServiceDate: Date;
      potentialCustomerName: "string";
      technicianId: "string";
      number: "string";
      technicianName: "string";
      yourReference: "string";
      yourReferencePhone: "string";
      yourReferenceEmail: "string";
      yourOrderNumber: "string";
      public: boolean;
      date: Date;
      time: Date;
      finishDate: Date;
      description: "string";
      workDoneDescription: "string";
      notes: "string";
      categories: "string";
      priority: "string";
      changeDate: Date;
      protocols: [
        {
          id: "string";
          name: "string";
          extension: "string";
          path: "string";
          public: boolean;
          categories: [
            {
              id: "string";
              name: "string";
              color: "string";
            }
          ];
        }
      ];
      documents: [
        {
          id: "string";
          name: "string";
          extension: "string";
          path: "string";
          public: boolean;
          categories: [
            {
              id: "string";
              name: "string";
              color: "string";
            }
          ];
        }
      ];
      externalLinks: [
        {
          id: "string";
          name: "string";
          extension: "string";
          path: "string";
          public: boolean;
          categories: [
            {
              id: "string";
              name: "string";
              color: "string";
            }
          ];
        }
      ];
      diaryEntries: [
        {
          date: Date;
          text: "string";
        }
      ];
      statusDb: "string";
      status: "string";
      title: "string";
      statusText: "string";
    }
  ];
  nextLink: "string";
}
