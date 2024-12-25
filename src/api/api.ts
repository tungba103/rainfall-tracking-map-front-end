import { DateValue } from '@internationalized/date';
import { toast } from "react-toastify";

const BASE_URL = 'http://127.0.0.1:8000';

export type Dataset = {
  id: string;
  added_by: string;
  added: string;
  dataset_type_ref: number;
  metadata_type_ref: number;
  meta_data: {
    id: string;
    crs: string;
    product: {
      name: string;
    };
    properties: {
      datetime: string;
    }
  }
}

export const getDatasets = async (
  page: number,
  pageSize: number,
  productName: string, 
  resolution: number,
  // 4 || 10 
  frequency: string,
  //  'daily' || 'hourly'
  fromTime?: DateValue, 
  toTime?: DateValue,
  mockData?: any[]
): Promise<Dataset[]> => {
  const url = `${BASE_URL}/datasets`;

  const params = new URLSearchParams();

  params.append('skip', ((page - 1) * pageSize).toString());
  params.append('pageSize', pageSize.toString());
  params.append('product_name', productName);

  const queryString = params.toString();

  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    const response = await fetch(`${url}?${queryString}`);
    const data = await response.json();
    return data;
  } catch {
    toast.error('Failed to fetch data', { autoClose: 1000 });
    return mockData || [];
  }

}

export const postDataset = async (
  productName: string,
  resolution: string,
  frequency: string,
  time: DateValue,
  img: FileList,
  // img: string
) => {
  const url = `${BASE_URL}/datasets`;

  const formData = new FormData();
  formData.append('productName', productName);
  formData.append('resolution', resolution);
  formData.append('frequency', frequency);
  formData.append('time', time.toString());
  // formData.append('img', img);
  formData.append('img', 'img');

  console.log('Call API: ', productName, resolution, frequency, time.toString(), img);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch {
    toast.error('Failed to create dataset', {autoClose: 2000});
    throw new Error('Failed to create dataset');
  }
}