
export const usePopoverToggle = (popover: any, event: MouseEvent) => {
  popover.popover.toggle(event);
}

export const usePopoverShow = (popover: any, event: MouseEvent) => {
  popover.popover.show(event);
}

export const usePopoverHide = (popover: any, event: MouseEvent) => {
  popover.popover.hide(event);
}
