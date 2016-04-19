# Personal-Homepage
wql 7-color-card
//定义变量
$redBase: #DC143C;
$orangeBase: saturate(lighten(adjust_hue($redBase, 39), 5), 7);//#f37a16
$yellowBase: saturate(lighten(adjust_hue($redBase, 64), 6), 13);//#fbdc14
$greenBase: desaturate(darken(adjust_hue($redBase, 102), 2), 11);//#73c620
$blueBase: saturate(darken(adjust_hue($redBase, 201), 2), 1);//#12b7d4
$purpleBase: saturate(darken(adjust_hue($redBase, 296), 2), 1);//#a012d4
$blackBase: #777;
$bgc: #fff;

//定义颜色变暗的 mixin
@mixin swatchesDarken($color) {
    @for $i from 1 through 10 {
        $x:$i+11;
        li:nth-child(#{$x}) {
            $n:$i*5;
            $bgc:darken($color,$n); //颜色变暗
            background-color: $bgc;
&:hover:before { //hover状态显示颜色编号
                content: "#{$bgc}";
                color: lighten($bgc,40);
                font-family: verdana;
                font-size: 8px;
                padding: 2px;
            }
        }
    }
}
//定义颜色变亮的 mixin
@mixin swatchesLighten($color) {
    @for $i from 1 through 10 {
        $x:11-$i;
        li:nth-child(#{$x}) {
            $n:$i*5;
            $bgc:lighten($color,$n);
            background-color: $bgc;
&:hover:before {
                content: "#{$bgc}";
                color: darken($bgc,40);
                font-family: verdana;
                font-size: 8px;
                padding: 2px;
            }
        }
    }
}
.swatches li {    
    width: 4.7619047619%;
    float: left;
    height: 60px;
    list-style: none outside none;
}

ul.red {
    @include swatchesLighten($redBase);
    @include swatchesDarken($redBase);
    li:nth-child(11) {
        background-color: $redBase;
    }
}

ul.orange {
    @include swatchesLighten($orangeBase);
    @include swatchesDarken($orangeBase);
    li:nth-child(11) {
        background-color: $orangeBase;
    }
}

ul.yellow {
    @include swatchesLighten($yellowBase);
    @include swatchesDarken($yellowBase);
    li:nth-child(11) {
        background-color: $yellowBase;
    }
}

ul.green {
    @include swatchesLighten($greenBase);
    @include swatchesDarken($greenBase);
    li:nth-child(11) {
        background-color: $greenBase;
    }
}

ul.blue {
    @include swatchesLighten($blueBase);
    @include swatchesDarken($blueBase);
    li:nth-child(11) {
        background-color: $blueBase;
    }
}

ul.purple {
    @include swatchesLighten($purpleBase);
    @include swatchesDarken($purpleBase);
    li:nth-child(11) {
        background-color: $purpleBase;
    }
}

ul.black {
    @include swatchesLighten($blackBase);
    @include swatchesDarken($blackBase);
    li:nth-child(11) {
        background-color: $blackBase;
    }
}
