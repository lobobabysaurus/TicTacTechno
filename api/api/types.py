from enum import Enum


class BoardPositions(Enum):
    TOP_LEFT = 'top_left'
    TOP = 'TOP'
    TOP_RIGHT = 'top_right'
    MIDDLE_LEFT = 'middle_left'
    MIDDLE = 'middle'
    MIDDLE_RIGHT = 'middle_right'
    BOTTOM_LEFT = 'bottom_left'
    BOTTOM = 'bottom'
    BOTTOM_RIGHT = 'bottom_right'

class BoardRows(Enum):
    _bp = BoardPositions
    TOP = [_bp.TOP_LEFT, _bp.TOP, _bp.TOP_RIGHT]
    MIDDLE = [_bp.MIDDLE_LEFT, _bp.MIDDLE, _bp.MIDDLE_RIGHT]
    BOTTOM = [_bp.BOTTOM_LEFT, _bp.BOTTOM, _bp.BOTTOM_RIGHT]


class BoardColumns(Enum):
    _bp = BoardPositions
    LEFT = [_bp.TOP_LEFT, _bp.MIDDLE_LEFT, _bp.BOTTOM_LEFT]
    CENTER = [_bp.TOP, _bp.MIDDLE, _bp.BOTTOM]
    RIGHT = [_bp.TOP_RIGHT, _bp.MIDDLE_RIGHT, _bp.BOTTOM_RIGHT]


class BoardCrosses(Enum):
    _bp = BoardPositions
    LEFT = [_bp.TOP_LEFT, _bp.MIDDLE, _bp.BOTTOM_RIGHT]
    RIGHT = [_bp.TOP_RIGHT, _bp.MIDDLE, _bp.BOTTOM_LEFT]
