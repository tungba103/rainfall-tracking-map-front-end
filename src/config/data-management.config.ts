const dataConfigBase = [
  {
    key: 'datasetName',
    label: 'Dataset Name',
    isColumn: true,
    isCreate: true,
    inputType: 'text',
  },
  {
    key: 'description',
    label: 'Description',
    isColumn: true,
    isCreate: true,
    inputType: 'text',
  },
  {
    key: 'endTime',
    label: 'Time',
    isColumn: true,
    isCreate: true,
    inputType: 'date-time',
  },
  {
    key: 'isAvailable',
    label: 'Available',
    isColumn: true,
    isCreate: false,
    inputType: 'checkbox',
  },
  {
    key: 'resolution',
    label: 'Resolution',
    isCreate: true,
    inputType: 'resolution', 
  },
  {
    key: 'frequency',
    label: 'Frequency',
    isCreate: true,
    inputType: 'frequency', 
  },
  {
    key: 'actions',
    label: 'Actions',
    isColumn: true,
    isCreate: false,
  },
  {
    key: 'file',
    label: 'File',
    isColumn: false,
    isCreate: true,
    inputType: 'file'
  }
];

export const dataTypes = {
  hourly4: {
    label: '4km hourly',
    value: {
      resolution: 4,
      frequency: 'hourly'
    }
  },
  hourly10: {
    label: '10km hourly',
    value: {
      resolution: 10,
      frequency: 'hourly'
    }
  },
  daily10: {
    label: '10km daily',
    value: {
      resolution: 10,
      frequency: 'daily'
    }
  }
}

export const dataManagementNavItems =
{
  label: "DATA MANAGEMENT",
  subItems: [
    {
      label: "HIMAWARI",
      name: "HIMAWARI",
      href: "/data-management/himawari",
      dataConfig: dataConfigBase,
    },
    {
      label: "IMERG_E",
      name: "IMERG_E",
      href: "/data-management/imerg_e",
      dataConfig: dataConfigBase,
    },
    {
      label: "IMERG_L",
      name: "IMERG_L",
      href: "/data-management/imerg_l",
      dataConfig: dataConfigBase,
    },
    {
      label: "IMERG_F",
      name: "IMERG_F",
      href: "/data-management/imerg_f",
      dataConfig: dataConfigBase,
    },
    {
      label: "GSMaP",
      name: "GSMaP",
      href: "/data-management/gsmap",
      dataConfig: dataConfigBase,
    },
    {
      label: "CCS",
      name: "CCS",
      href: "/data-management/ccs",
      dataConfig: dataConfigBase,
    },
    {
      label: "FY4A",
      name: "FY4A",
      href: "/data-management/fy4a",
      dataConfig: dataConfigBase,
    },
    {
      label: "Radar",
      name: "Radar",
      href: "/data-management/radar",
      dataConfig: dataConfigBase,
    },
    {
      label: "AWS",
      name: "AWS",
      href: "/data-management/aws",
      dataConfig: dataConfigBase,
    },
    {
      label: "integrated",
      name: "integrated",
      href: "/data-management/integrated",
      dataConfig: dataConfigBase,
    },
    {
      label: "CAPE",
      name: "CAPE",
      href: "/data-management/cape",
      dataConfig: dataConfigBase,
    },
    {
      label: "EWSS",
      name: "EWSS",
      href: "/data-management/ewss",
      dataConfig: dataConfigBase,
    },
    {
      label: "IE",
      name: "IE",
      href: "/data-management/ie",
      dataConfig: dataConfigBase,
    },
    {
      label: "ISOR",
      name: "ISOR",
      href: "/data-management/isor",
      dataConfig: dataConfigBase,
    },
    {
      label: "KX",
      name: "KX",
      href: "/data-management/kx",
      dataConfig: dataConfigBase,
    },
    {
      label: "PEV",
      name: "PEV",
      href: "/data-management/pev",
      dataConfig: dataConfigBase,
    },
    {
      label: "R250",
      name: "R250",
      href: "/data-management/r250",
      dataConfig: dataConfigBase,
    },
    {
      label: "R500",
      name: "R500",
      href: "/data-management/r500",
      dataConfig: dataConfigBase,
    },
    {
      label: "R850",
      name: "R850",
      href: "/data-management/r850",
      dataConfig: dataConfigBase,
    },
    {
      label: "SLHF",
      name: "SLHF",
      href: "/data-management/slhf",
      dataConfig: dataConfigBase,
    },
    {
      label: "SLOR",
      name: "SLOR",
      href: "/data-management/slor",
      dataConfig: dataConfigBase,
    },
    {
      label: "SSHF",
      name: "SSHF",
      href: "/data-management/sshf",
      dataConfig: dataConfigBase,
    },
    {
      label: "TCLW",
      name: "TCLW",
      href: "/data-management/tclw",
      dataConfig: dataConfigBase,
    },
    {
      label: "TCW",
      name: "TCW",
      href: "/data-management/tcw",
      dataConfig: dataConfigBase,
    },
    {
      label: "TCWV",
      name: "TCWV",
      href: "/data-management/tcwv",
      dataConfig: dataConfigBase,
    },
    {
      label: "U250",
      name: "U250",
      href: "/data-management/u250",
      dataConfig: dataConfigBase,
    },
    {
      label: "U850",
      name: "U850",
      href: "/data-management/u850",
      dataConfig: dataConfigBase,
    },
    {
      label: "V250",
      name: "V250",
      href: "/data-management/v250",
      dataConfig: dataConfigBase,
    },
    {
      label: "V850",
      name: "V850",
      href: "/data-management/v850",
      dataConfig: dataConfigBase,
    },
    {
      label: "DEM",
      name: "DEM",
      href: "/data-management/dem",
      dataConfig: dataConfigBase,
    },
  ]
};
