export type PartyDetails = {
  party_id: string;
  name: string;
  long_name: string;
  candidate: string;
  description: string;
  website_url: string;
  election_manifesto_url: string;
  logo_url: string;
  candidate_image_url: string;
  background_color?: string;
  is_already_in_parliament?: boolean;
  is_small_party?: boolean;
  election_result_forecast_percent: number;
};
