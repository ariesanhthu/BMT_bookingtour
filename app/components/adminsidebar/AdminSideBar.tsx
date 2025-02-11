import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  { name: "Dashboard", href: "home" },
  { name: "Role Management", href: "role" },
  { name:"User Management", href: "user" },
  { name:"Customer Management", href: "custmer" },
  { name:"Product Management", href: "product" },
  { name:"Service Management", href: "service" },
  { name:"Category Management", href: "category" },
  { name:"Order Management", href: "orders" },
  // { name:"Test Management", href: "/test" },
  { name:"HomePage Management", href: "homePageContent" },
]

export function AdminSideBar() {
  return (
    <Sidebar className="z-50">
      <SidebarTrigger />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}