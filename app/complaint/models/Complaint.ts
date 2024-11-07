export interface IComplaint {
  id:           number;
  started_at:   string;
  finished_at:  string;
  status:       Status;
  process_info: ProcessInfo;
  actions:      'observer' | 'executor';
}

interface ProcessInfo {
  id:          number;
  description: string;
}

interface Status {
  name:  string;
  color: string;
  slug: 'pending' | 'completed' | 'discarded';
}
