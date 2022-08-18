# Vis3

## three.jsコードのimport設定
three.jsのリポジトリをクローンした環境より、build/three.module.jsとexamples/jsm/controls/OrbitControls.jsをjs/配下にコピーし、OrbitControls.jsの先頭部分を以下のように修正。
<pre>
import {                                    import {
        EventDispatcher,                            EventDispatcher,
        MOUSE,                                      MOUSE,
        Quaternion,                                 Quaternion,
        Spherical,                                  Spherical,
        TOUCH,                                      TOUCH,
        Vector2,                                    Vector2,
        Vector3                                     Vector3
} from './three.module.js';        ←       } from 'three';
</pre>