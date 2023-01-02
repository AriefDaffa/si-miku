interface Title {
  title: string;
  value: string;
}

interface Text {
  [key: string]: any;
}

export interface TableProps {
  isLoading: boolean;
  headerTitle: Title[];
  content: Text[];
}
