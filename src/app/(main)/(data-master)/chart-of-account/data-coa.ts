export interface DataCOA {
  id: string;
  name: string;
  type: string;
  balance: number;
  children?: DataCOA[]; 
  
}

export const asset_data: DataCOA = {
  id: "1-0000",
  name: "Harta",
  type: "Header",
  balance: 1159804618.34,
  children: [
    {
      id: "1-1000",
      name: "Kas & Setara Kas",
      type: "Header",
      balance: 173554071,
      children: [
        {
          id: "1-1100",
          name: "Petty Cash Yosep",
          type: "Detail Cheque",
          balance: 173554071,
        },
        {
          id: "1-1200",
          name: "Petty Cash Yedi",
          type: "Detail Cheque",
          balance: 173554071,
        },
        {
          id: "1-1300",
          name: "Petty Cash Fitri",
          type: "Detail Cheque",
          balance: 0,
        },
      ],
    },
    {
      id: "1-2000",
      name: "Bank",
      type: "Header",
      balance: 123608551.34,
      children: [
        {
          id: "1-2100",
          name: "Bank Mandiri",
          type: "Detail Cheque",
          balance: 123608551.34,
        },
      ],
    },
    {
      id: "1-3000",
      name: "Piutang",
      type: "Header",
      balance: 950662138,
      children: [
        {
          id: "1-3100",
          name: "Piutang Usaha",
          type: "Detail",
          balance: 950662138,
        },
      ],
    },
    {
      id: "1-4000",
      name: "Pajak",
      type: "Header",
      balance: 600000,
      children: [
        {
          id: "1-4900",
          name: "Pph Pasal 23",
          type: "Detail",
          balance: 600000,
        },
      ],
    },
    {
      id: "1-5000",
      name: "Uang Muka Penjualan",
      type: "Header",
      balance: 0,
    },
    {
      id: "1-6000",
      name: "Kendaraan",
      type: "Header",
      balance: 0,
    },
    {
      id: "1-7000",
      name: "Peralatan",
      type: "Header",
      balance: 258488000,
      children: [
        {
          id: "1-7100",
          name: "Peralatan Habitat Welding Auto",
          type: "Detail",
          balance: 0,
        },
        {
          id: "1-7200",
          name: "Peralatan Habitat Welding Manu",
          type: "Detail",
          balance: 0,
        },
        {
          id: "1-7300",
          name: "Peralatan HTW",
          type: "Detail",
          balance: 258488000,
        },
      ],
    },
  ],
};

export const liability_data: DataCOA = {
  id: "2-0000",
  name: "Hutang",
  type: "Header",
  balance: 532016874,
  children: [
    {
      id: "2-1000",
      name: "Hutang Perusahaan",
      type: "Header",
      balance: 481785000,
      children: [
        {
          id: "2-1100",
          name: "Hutang Usaha",
          type: "Detail",
          balance: 481785000,
        },
        {
          id: "2-1200",
          name: "Hutang Gaji Karyawan",
          type: "Detail",
          balance: 0
        }
      ]
    },
    {
      id: "2-2000",
      name: "Hutang Pinjaman",
      type: "Header",
      balance: 0,
      children: [
        {
          id: "2-2100",
          name: "Pinjaman Bank",
          type: "Detail",
          balance: 0
        },
        {
          id: "2-2200",
          name: "Pinjaman Hubungan Istimewa",
          type: "Detail",
          balance: 0
        },
        {
          id: "2-2300",
          name: "Pinjaman pada Pihak Kedua",
          type: "Detail",
          balance: 0
        },
      ]
    },
    {
      id: "2-3000",
      name: "Hutang Pajak",
      type: "Header",
      balance: 50231874,
      children: [
        {
          id: "2-3100",
          name: "Pajak PPN",
          type: "Header",
          balance: 50231874,
          children: [
            {
              id: "2-3110",
              name: "Pajak PPN Keluaran",
              type: "Detail",
              balance: 67412774,
            },
            {
              id: "2-3120",
              name: "Pajak PPN Masukan",
              type: "Detail",
              balance: 17180900,
            }
          ]
        }
      ]
    },
  ],
};


export const equity_data: DataCOA = {
  id: "3-0000",
  name: "Modal",
  type: "Header",
  balance: 627787744.34,
  children: [
    {
      id: "3-1000",
      name: "Modal Disetor",
      type: "Header",
      balance: 0,
      children: [
        {
          id: "3-1100",
          name: "Modal Direktur",
          type: "Detail",
          balance: 0
        },
        {
          id: "3-1200",
          name: "Modal Komisaris",
          type: "Detail",
          balance: 0
        }
      ]
    },
    {
      id: "3-2000",
      name: "Laba/Rugi",
      type: "Header",
      balance: 240468668.47,
      children: [
        {
          id: "3-8000",
          name: "Laba Ditahan",
          type: "Detail",
          balance: 0
        },
        {
          id: "3-9000",
          name: "Laba Tahun Berjalan",
          type: "Detail",
          balance: 240468668.47,
        },
      ]
    },
    {
      id: "3-9999",
      name: "Historical Balancing Account",
      type: "Detail",
      balance: 387319075.87
    }
  ]
}

export const income_data: DataCOA = {
  id: "4-0000",
  name: "Pendapatan",
  type: "Header",
  balance: 1887234600,
  children: [
    {
      id: "4-1000",
      name: "Penjualan",
      type: "Header",
      balance: 1875384600,
      children: [
        {
          id: "4-1100",
          name: "Penjualan Barang",
          type: "Detail",
          balance: 36152000
        },
        {
          id: "4-1200",
          name: "Rental Peralatan",
          type: "Detail",
          balance: 1839232600
        },

      ]
    },
    {
      id: "4-2000",
      name: "Teknisi",
      type: "Header",
      balance: 3850000
    },
    {
      id: "4-3000",
      name: "Biaya Pengiriman",
      type: "Detail",
      balance: 8000000
    }
  ]
}

export const cost_of_sales_data: DataCOA = {
  id: "5-0000",
  name: "Harga Pokok Pembelian",
  type: "Header",
  balance: 203200000,
  children: [
    {
      id: "5-1000",
      name: "Pembelian & Rental",
      type: "Header",
      balance: 195830000,
      children: [
        {
          id: "5-1100",
          name: "Pembelian Barang",
          type: "Detail",
          balance: 14900000
        },
        {
          id: "5-1200",
          name: "Rental Peralatan",
          type: "Detail",
          balance: 166150000
        },
        {
          id: "5-1300",
          name: "Consumable",
          type: "Detail",
          balance: 11310000
        },
        {
          id: "5-1400",
          name: "PPE dan Perlengkapan",
          type: "Detail",
          balance: 3470000
        },
      ]
    },
    {
      id: "5-2000",
      name: "Beban Karyawan Produksi",
      type: "Header",
      balance: 0,
      children: [
        {
          id: "5-2100",
          name: "Upah Teknisi",
          type: "Detail",
          balance: 0
        },
        {
          id: "5-2200",
          name: "Upah Supporting",
          type: "Detail",
          balance: 0
        },
        {
          id: "5-2300",
          name: "Biaya MCU dan Konsultasi",
          type: "Detail",
          balance: 0
        },
        
      ]
    },
    {
      id: "5-3000",
      name: "Beban Produksi",
      type: "Header",
      balance: 7370000,
      children: [
        {
          id: "5-3100",
          name: "Biaya Pengiriman",
          type: "Detail",
          balance: 0
        },
        {
          id: "5-3200",
          name: "Biaya Perbaikan Peralatan",
          type: "Detail",
          balance: 0
        },
        {
          id: "5-3300",
          name: "Biaya Sertifikasi & Uji Alat",
          type: "Detail",
          balance: 0
        },
        {
          id: "5-4400",
          name: "Biaya Pelatihan teknisi",
          type: "Detail",
          balance: 7370000
        },
      ]
    },
  ]
}

export const expense_data: DataCOA = {
  id: "6-0000",
  name: "Biaya Perusahaan",
  type: "Header",
  balance: 1443678888,
  children: [
    {
      id: "6-1000",
      name: "Gaji & Tunjangan",
      type: "Header",
      balance: 1439178888,
      children: [
        {
          id: "6-1100",
          name: "Gaji Karyawan",
          type: "Header",
          balance: 1439178888,
          children: [
            {
              id: "6-1110",
              name: "Gaji Karyawan Staff",
              type: "Detail",
              balance: 1439178888
            },
            {
              id: "6-1120",
              name: "Insentif Proyek",
              type: "Detail",
              balance: 0
            },
          ]
        },
        {
          id: "6-1200",
          name: "Tunjangan Karyawan",
          type: "Header",
          balance: 0,
          children: [
            {
              id: "6-1210",
              name: "Tunjangan Pph Pasal 21",
              type: "Detail",
              balance: 0
            },
            {
              id: "6-1220",
              name: "Tunjangan Jabatan",
              type: "Detail",
              balance: 0
            },
            {
              id: "6-1230",
              name: "BPJS Kesehatan",
              type: "Detail",
              balance: 0
            },
            {
              id: "6-1240",
              name: "BPJS Ketenagakerjaan",
              type: "Detail",
              balance: 0
            },
          ]
        }
      ]
    },
    {
      id: "6-2000",
      name: "Biaya Operasional",
      type: "Header",
      balance: 0
    },
    {
      id: "6-3000",
      name: "Biaya Marketing",
      type: "Header",
      balance: 0
    },
    {
      id: "6-4000",
      name: "Biaya Perizinan & Legalitas",
      type: "Header",
      balance: 0
    },
    {
      id: "6-5000",
      name: "Beban Lainnya",
      type: "Header",
      balance: 4500000
    },
    {
      id: "6-6000",
      name: "Beban Pajak",
      type: "Header",
      balance: 0
    },
    {
      id: "6-9000",
      name: "CSR",
      type: "Header",
      balance: 0
    },
  ]
}

export const other_income_data: DataCOA = {
  id: "8-0000",
  name: "Pendapatan Lain Lain",
  type: "Header",
  balance: 353070.58,
  children: [
    {
      id: "8-1000",
      name: "Pendapatan Bunga Bank",
      type: "Detail",
      balance: 353070.58,
    }
  ]
}

export const other_expense_data: DataCOA = {
  id: "9-0000",
  name: "Biaya Lain-lain",
  type: "Header",
  balance: 240114.11,
  children: [
    {
      id: "9-1000",
      name: "Biaya Adm Bank & Pajak Bunga",
      type: "Detail",
      balance: 226114.11
    },
    {
      id: "9-2000",
      name: "Biaya Transfer",
      type: "Detail",
      balance: 14000
    },
  ]
}