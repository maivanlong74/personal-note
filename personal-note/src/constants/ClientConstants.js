export const SCAN_MODE = {
  NONE: 'NONE',
  NFC: 'NFC',
  MANUAL: 'MANUAL'
}

export const TYPE_QUESTION = {
  MISSING_ITEMS: "missing",
  CONSUMABLES: "consumables",
  AB_QUESTIONS: "a/b"
}

export const STATUS_QUESTION_ANSWER = {
  YES: "yes",
  NO: "no"
}

export const ACTION_SCAN_TOOL = {
  ADD: 'add',
  EDIT: 'edit'
}

export const STATUS_TOOL_ITEM = {
  TAKING: 'taking',
  CONTINUING_TO_USE: 'continuing to use',
  RETURNED: 'returned',
  LOST: 'lost'
}

export const STATUSES_TOOL_ITEM = [
  STATUS_TOOL_ITEM.TAKING,
  STATUS_TOOL_ITEM.CONTINUING_TO_USE,
  STATUS_TOOL_ITEM.RETURNED,
  STATUS_TOOL_ITEM.LOST
]

export const STATUSES_TOOL_ITEM_LOST_INDEX = STATUSES_TOOL_ITEM.indexOf(STATUS_TOOL_ITEM.LOST);

export const STATUS_LABEL_TOOL_ITEM = {
  [STATUS_TOOL_ITEM.TAKING]: '持出',
  [STATUS_TOOL_ITEM.CONTINUING_TO_USE]: '再利用',
  [STATUS_TOOL_ITEM.RETURNED]: '返却',
  [STATUS_TOOL_ITEM.LOST]: '紛失/盗難',
}

export const TYPE_REPORT_QUESTION = {
  RETURNED: "入庫時",
  TAKING: "出庫時",
  CONTINUING_TO_USE: "持出時"
}

export const USER_ID = 'Hon4NTdjH98VGQ3RCpPU';

export const TOOL_SCAN_TYPE = {
  SINGLE: '0',
  BATCH: '1'
}

export const ROLE = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  LEADER: 'leader',
  WORKER: 'worker'
}

export const ROLE_MANAGEMENT = [
  ROLE.ADMIN, ROLE.MANAGER, ROLE.LEADER
]

export const STATUS_SCHEDULE = {
  CANCELLED: 'cancelled',
  CONFIRMED: 'confirmed'
}

export const STATUSES_TOOL_ITEM_IN_USE_OR_LOST = [
  STATUS_TOOL_ITEM.TAKING,
  STATUS_TOOL_ITEM.CONTINUING_TO_USE,
  STATUS_TOOL_ITEM.LOST
]

export const IS_NEGATIVE = '#FF4E4E'

export const APPROVAL_STATUS = {
  APPROVED: 'approved',
  REJECTED: 'rejected'
}

export const TYPE_REQUEST = {
  AUTOSCAN: 'autoscan',
  MANUAL: 'manual'
}