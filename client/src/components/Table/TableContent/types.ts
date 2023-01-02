interface Text {
  [key: string]: any;
}

interface Title {
  title: string;
  value: string;
}

export interface tableContentProps {
  content: Text;
  headerTitle: Title[];
}
