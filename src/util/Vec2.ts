const customInspectSymbol = Symbol.for('nodejs.util.inspect.custom');

export class Vec2 {

    x: number
    y: number

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    add(v: Vec2 | number, y?: number): this {
        if (v instanceof Vec2){
            this.x += v.x;
            this.y += v.y;
        }
        else if (y){
            this.x += v;
            this.y += y;
        }
        return this;
    }

    sub(v: Vec2 | number, y?: number): this {
        if (v instanceof Vec2){
            this.x -= v.x;
            this.y -= v.y;
        }
        else if (y){
            this.x -= v;
            this.y -= y;
        }
        return this;
    }

    mul(s: number): this {
        this.x*=s;
        this.y*=s;
        return this;
    }

    div(s: number): this {
        this.x/=s;
        this.y/=s;
        return this;
    }

    magSq(): number {
        return this.x*this.x + this.y*this.y;
    }

    mag(): number {
        return Math.sqrt(this.x*this.x+this.y*this.y);
    }

    clone(): Vec2 {
        return new Vec2(this.x, this.y);
    }

    static dot(v1: Vec2, v2: Vec2): number {
        return v1.x*v2.x + v1.y*v2.y;
    }

    static distSq(v1: Vec2, v2: Vec2): number {
        const dx = v2.x-v1.x;
        const dy = v2.y-v1.y;
        return dx*dx+dy*dy;
    }

    static dist(v1: Vec2, v2: Vec2): number {
        const dx = v2.x-v1.x;
        const dy = v2.y-v1.y;
        return Math.sqrt(dx*dx+dy*dy);
    }

    toString(){
        return `Vec2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
    }

    public [customInspectSymbol](depth: any, opts: any, inspect: any): string {
        return this.toString();
    }
}