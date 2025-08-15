/**
 * Circle Class - Game piece component
 * 圆形游戏组件类
 * 
 * This class represents a single circle in the game grid.
 * Each circle can be in one of three states: unselected, selected, or cat.
 */
function Circle() {
    createjs.Shape.call(this);
    
    /**
     * Set the circle type and update its appearance
     * @param {number} type - Circle type constant
     */
    this.setCircleType = function(type) {
        this._circleType = type;
        switch (type) {
            case Circle.TYPE_UNSELECTED:
                this.setColor("#cccccc"); // Gray
                break;
            case Circle.TYPE_SELECTED:
                this.setColor("#ff6600"); // Orange
                break;
            case Circle.TYPE_CAT:
                this.setColor("#0000ff"); // Blue
                break;
        }
    }
    
    /**
     * Set the circle color
     * @param {string} colorString - Hex color code
     */
    this.setColor = function(colorString) {
        this.graphics.beginFill(colorString);
        this.graphics.drawCircle(0, 0, 25);
        this.graphics.endFill();
    }
    
    /**
     * Get the current circle type
     * @returns {number} - Circle type constant
     */
    this.getCircleType = function() {
        return this._circleType;
    }
    
    // Initialize as unselected
    this.setCircleType(Circle.TYPE_UNSELECTED);
}

// Inherit from CreateJS Shape
Circle.prototype = new createjs.Shape();

// Circle type constants
Circle.TYPE_UNSELECTED = 1; // Gray circle
Circle.TYPE_SELECTED = 2;    // Orange circle (obstacle)
Circle.TYPE_CAT = 3;        // Blue circle (cat)