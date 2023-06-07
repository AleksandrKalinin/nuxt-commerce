export {};

declare global {
  interface User {
    id: number;
    registration_date: Date;
    email: string;
    role: string;
  }

  interface OrderItem {
    id: number;
    amount: number;
  }

  enum OrderStatus {
    Pending = "Pending",
    Completed = "Completed",
    Cancelled = "Cancelled",
  }

  interface Review {
    id: string;
    author: string | undefined;
    date: Date;
    text: string;
  }

  interface CatalogItem {
    name: string;
    id: number;
    price: number;
    date: Date | string;
    manufacturer: string;
    photo: string;
    type: string;
    battery_type: string;
    pixels: number;
    max_FPS_video: number;
    max_FPS_photo: number;
    max_sensitivity: number;
    max_resolution: string;
    min_sensitivity: number;
    wi_fi: boolean;
    card_support: string;
    matrix_type: string;
    matrix_size: string;
    popularity: number;
    rating: number;
    warranty: number;
    in_stock: number;
    item_code: number;
    is_visible: boolean;
    reviews: Review[];
  }

  interface Order {
    id?: number;
    created_at: Date;
    items: CatalogItem[];
    userId: string;
    user: string;
    total: number;
    status: OrderStatus;
  }

  interface SelectOption {
    label: string | number;
    selected: boolean;
  }

  interface SelectedOptions {
    manufacturer: string[];
    type: string[];
    matrix_type: string[];
    matrix_size: string[];
    pixels: string[];
  }

  interface BaseAddModalForm {
    name: string;
    dataType: string;
    elType: string;
    default: string;
    placeholder: string;
    options?: Boolean[];
  }

  interface SelectedItemTabs {
    description: string;
    reviews: string;
  }

  interface CartDBItem {
    item: CatalogItem;
    amount: number;
  }

  interface CartItem extends CatalogItem {
    total?: number;
    amount?: number;
  }

  interface EditorObject {
    [key: string]: undefined | number | string | boolean | EditorObject;
  }

  interface EditorDesign {
    body: EditorObject;
    counters: {
      u_rows: number;
      u_columns: number;
    };
    schemaVersion: number;
  }

  interface EditorIframe {
    callbackId: number;
    callbacks: () => {}[];
    destroy: () => {};
    id: number;
    iframe: HTMLIFrameElement;
    onWindowMessage: (e: Event) => {};
    ready: boolean;
  }

  interface EmailEditorData {
    amp: EditorObject;
    chunks: EditorObject;
    design: EditorObject;
    html: string;
  }

  interface EmailEditor {
    editor: {
      frame: EditorIframe;
      saveDesign: (e: (e: EditorDesign) => void) => void;
      loadDesign: (e: EditorDesign | null) => void;
      exportHtml: (html: (e: EmailEditorData) => void) => void;
    };
    appearance: undefined | string;
    editorId: undefined | string;
    projectId: undefined | string;
    id: undefined | string;
    exportHtml: () => {};
    loadDesign: () => {};
    loadEditor: () => {};
    saveDesign: () => {};
    locale: undefined | string;
    minHeight: undefined | string;
    tools: undefined | string;
  }

  interface DataSet {
    backgroundColor: string[];
    data: number[];
    label?: string;
  }

  interface ChartData {
    labels: Array<string>;
    datasets: Array<DataSet>;
  }

  export interface BaseTableHeader {
    label: string;
    value: string;
    type: string;
    action?: (id: string, event?: Event) => {};
    options?: string[];
  }
}
