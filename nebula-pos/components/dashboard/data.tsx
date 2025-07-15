import {
  Activity,
  AlertTriangle,
  Archive,
  ArrowLeftRight,
  BarChart2,
  Barcode,
  Building,
  CircleUserRoundIcon,
  CreditCard,
  DoorOpen,
  File,
  FileText,
  History,
  LayoutDashboard,
  LineChart,
  Lock,
  LucideIcon,
  MoveHorizontal,
  Package,
  PackagePlus,
  Printer,
  Receipt,
  Settings,
  Shield,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  Sliders,
  Tags,
  Truck,
  Undo2,
  User,
  UserCheck,
  UserPlus,
  Users,
  UserX,
} from "lucide-react"

export type NavUser = {
  name: string;
  email: string;
  avatar: string;
}

export type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon
}

export type NavSubItem = {
  title: string;
  icon: any;
  url?: string
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
    icon: LucideIcon
  }[];
  collapsed?: boolean
}
export type dataRoutesProps = {
  user: NavUser;
  principal: NavItem[];
  items: NavSubItem[];
  modules: NavSubItem[]
}
export const dataRoutes: dataRoutesProps = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  principal: [
    {
      title: "Principal",
      url: "/dashboard/principal",
      icon: LayoutDashboard,
    }
  ],
  items: [
    {
      title: "Nueva venta",
      url: "/dashboard/punto-venta/nueva-venta",
      icon: ShoppingCart,
      collapsed: false
    },
    {
      title: "Caja",
      icon: Receipt,
      isActive: true,
      items: [
        {
          title: "Apertura y Cierre",
          url: "/dashboard/punto-venta/caja/apertura-cierre",
          icon: DoorOpen
        },
        {
          title: "Movimientos",
          url: "/dashboard/punto-venta/caja/movimientos",
          icon: ArrowLeftRight
        }
      ],
    },
    {
      title: "Tickets Anteriores",
      url: "/dashboard/punto-venta/tickets-anteriores",
      icon: Undo2,
    },
    {
      title: "Historial de Ventas",
      url: "/dashboard/punto-venta/historial-ventas",
      icon: History,
    },
  ],
  modules: [
    {
      title: "Inventario",
      icon: Archive,
      isActive: true,
      items: [
        {
          title: "Productos",
          url: "/dashboard/modulos/inventario/productos",
          icon: Package
        },
        {
          title: "Entradas y Salidas",
          url: "/dashboard/modulos/inventario/entradas-salidas",
          icon: MoveHorizontal

        },
        {
          title: "Ajustes de inventario",
          url: "/dashboard/modulos/inventario/ajustes",
          icon: PackagePlus

        },
        {
          title: "Categorias y Marcas",
          url: "/dashboard/modulos/inventario/categorias",
          icon: Tags

        },
        {
          title: "Proveedores",
          url: "/dashboard/modulos/inventario/alertas",
          icon: Truck

        },
        {
          title: "Alertas de Stock",
          url: "/dashboard/modulos/inventario/alertas",
          icon: AlertTriangle

        },
        {
          title: "Código de Barras",
          url: "/dashboard/modulos/inventario/codigo-barras",
          icon: Barcode

        },

      ],
    },
    {
      title: "Reportes",
      icon: BarChart2,
      isActive: true,
      items: [
        {
          title: "Ventas generales",
          url: "/dashboard/modulos/reportes/ventas",
          icon: LineChart

        },
        {
          title: "Por Producto",
          url: "/dashboard/modulos/reportes/producto",
          icon: ShoppingBag

        },
        {
          title: "Por Vendedor",
          url: "/dashboard/modulos/reportes/vendedor",
          icon: User

        },
        {
          title: "Fiscales",
          url: "/dashboard/modulos/reportes/fiscales",
          icon: FileText

        },

      ],
    },
    {
      title: "Clientes",
      icon: Users,
      isActive: false,
      items: [
        {
          title: "Lista de Clientes",
          url: "#",
          icon: UserCheck

        },
        {
          title: "Créditos y Deudas",
          url: "#",
          icon: CreditCard

        },
        {
          title: "Historial de Compras",
          url: "#",
          icon: ShoppingBasket

        },
      ],
    },
    {
      title: "Usuarios",
      icon: CircleUserRoundIcon,
      isActive: false,
      items: [
        {
          title: "Lista de Usuarios",
          url: "#",
          icon: Users

        },
        {
          title: "Crear Usuario",
          url: "#",
          icon: UserPlus

        },
        {
          title: "Roles y Permisos",
          url: "#",
          icon: Shield

        },
        {
          title: "Actividad o Bitácora",
          url: "#",
          icon: Activity

        },
        {
          title: "Usuarios Inactivos",
          url: "#",
          icon: UserX

        },
      ],
    },
    {
      title: "Configuración",
      icon: Settings,
      isActive: false,
      items: [
        {
          title: "Negocio",
          url: "#",
          icon: Building

        },
        {
          title: "Impresión y Tickets",
          url: "#",
          icon: Printer

        },
        {
          title: "Facturación",
          url: "#",
          icon: File
        },
        {
          title: "Parámetros del Sistema",
          url: "#",
          icon: Sliders

        },
        {
          title: "Seguridad",
          url: "#",
          icon: Lock

        }
      ],
    },
  ],
}
