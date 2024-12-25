import { GeopolygonLevelTypes, GranularityTypes, LayerNameTypes } from "@/config/constant";
import axios from "axios";

const BASE_URL = 'http://localhost:8000';

export type RailfallDetailParams = {
  layerName: LayerNameTypes;
  time: string;
  geopolygonId: number;
  level: GeopolygonLevelTypes;
  outputCrs: string;
  resolutionX: number;
  resolutionY: number;
}

export const getRainfallDetail = async ({
  layerName,
  time,
  geopolygonId,
  level,
  outputCrs,
  resolutionX,
  resolutionY,
}: RailfallDetailParams) => {
  try {
    const response = await axios.get(`${BASE_URL}/rainfall/detail`, {
      params: {
        layer_name: layerName,
        time,
        geopolygon_id: geopolygonId,
        level,
        output_crs: outputCrs,
        resolution_x: resolutionX,
        resolution_y: resolutionY,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Error fetching rainfall data:', error.response?.data || error.message);
    return null;
  }
};

export type RainfallGranularityParams = {
  layerName: LayerNameTypes;
  startDate?: string;
  endDate?: string;
  geopolygonId: number;
  granularity: GranularityTypes;
  level: GeopolygonLevelTypes;
  outputCrs: string;
  resolutionX: number;
  resolutionY: number;
};

export const getRainfallByGranularity = async ({
  layerName,
  startDate,
  endDate,
  geopolygonId,
  granularity,
  level,
  outputCrs,
  resolutionX,
  resolutionY,
}: RainfallGranularityParams) => {
  try {
    const response = await axios.get(`${BASE_URL}/rainfall/granularity`, {
      params: {
        layer_name: layerName,
        start_date: startDate,
        end_date: endDate,
        geopolygon_id: geopolygonId,
        granularity,
        level,
        output_crs: outputCrs,
        resolution_x: resolutionX,
        resolution_y: resolutionY,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Error fetching rainfall data by granularity:', error.response?.data || error.message);
    return null;
  }
};