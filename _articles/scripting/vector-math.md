---
title: Базовая векторная математика
author: Perry
steamId: '76561198046986723'
date: 01.10.2020
---
векторная математика

При создании игр сложно избежать использования векторной математики, однако в школах ее обычно не преподают. Хотя они довольно интуитивно понятны, как только вы к ним привыкнете, изучение векторной математики в первый раз может оказаться немного сложным, поэтому этот урок.

## Введение в векторы

### Что такое вектор

Векторы — это способ описания точки или направления в пространстве. Это пространство может иметь любое количество измерений, но в этом уроке мы сосредоточимся на 2D просто потому, что его легче рисовать. Однако все эти концепции применимы и к векторам более высоких размерностей!

Обычно вектор представляется как `(x, y)`, что можно интерпретировать как:

> Точка с координатами (x, y)

или

> Движение от (0, 0) до точки (x, y)

:::информация
При использовании векторов в качестве движения они описывают лишь движение ДО куда-то, исходящее из начала координат (0, 0). Если вы хотите описать движение, которое также имеет часть FROM, вам понадобится второй вектор для описания начального положения.
:::

#### Пример
Итак, давайте посмотрим, как мы будем думать и визуализировать два вектора: `A: (3, 2)` и `B: (-1, 3)`:

![Vector visualization](/images/external/4lalG0u.png)

::: информация
Векторы не имеют происхождения и всегда происходят из (0, 0). Если вы рассматриваете векторы как движения от начала координат до точки, вы также можете вычислить их длину, обозначаемую l_A и l_B.
:::

### Добавление векторов

Допустим, вы рассматриваете векторы как движения. Вы можете просто сложить два вектора, чтобы получить результат выполнения обоих движений. Например, если у вас есть вектора `A (xa, ya)` и `B (xb, yb)`, обозначающие два движения, каков результат выполнения обоих `A` и `B`? Визуализируется это так:
![Vector addition](/images/external/YBzf6oO.png)

::: информация
Перемещение сначала по вектору A, а затем по B приведет к тому же вектору, что и перемещение сначала по B, а затем по A. (Вот почему визуализация сложения векторов всегда приводит к такому параллелограмму).
:::

:::информация Пример
Вы можете рассчитать такие вещи, как смещения или отбрасывания, используя сложение, т. е. где заканчивается отряд после того, как его отбрасывают в каком-то направлении?
```
newUnitPos = unitPos + knockbackVector
```

:::

### Subtracting vectors

Now let's say we want to know the inverse question to the previous one: Assuming I have two vector positions `A` and `B`, what movement do I have to do to get from `A` to `B`? The answer to this is a vector subtraction: `C = B - A`. Note that this works exactly like regular math, so doing `A + C = B`:

![Vector subtraction](/images/external/Sa4gnxz.png)

::: info
Just like when subtracting regular numbers, order matters! `B - A` gives the vector from `A` to `B`, while `A - B` gives the opposite vector, from `B` to `A`.
:::

:::info Example
You can use vector subtraction to calculate the difference in position between two units, and get for example the distance between them:

```
distanceBetweenUnit1AndUnit2 = length(unit2Pos - unit1Pos)
```

:::

### Multiplying vectors

The last 'basic' vector operation I want to go over is multiplication with a number (NOT with another vector).

When multiplying a vector with a number it retains its direction, but its length is multiplied by this number:

![Vector multiplication](/images/external/1h83sJr.png)

:::info Example
You can use vector multiplication to rescale vectors to a certain length. For example when you have a unit or normal vector (length 1), multiplying with a number will make it that length.

```
vectorOfLength100 = vectorOfLength1 * 100
```

:::

### Vectors as Direction/Orientation

As seen before, vectors look very much like a direction to somewhere. This makes them very useful for representing the orientation of something instead of using an angle (because angles make calculating much more difficult).

To do so, orientation is often expressed as vectors of length 1. This is because of the special relation vectors have with angles: For an angle `a`, `(cos(a), sin(a))` is a vector of length 1, pointing in the direction of angle `a`:

![Vectors and angles](/images/external/vjW0ye7.png)

Вам может быть интересно, какой в ​​этом смысл: о том, зачем сохранять ориентацию в виде векторов длиной 1, см. раздел «Создание предмета перед игроком».

### Скалярное произведение

Последняя концепция вектора в этом уроке — это «скалярное произведение» двух векторов. Проще говоря, это скалярное произведение дает вам оценку того, «сколько векторов направлены в одном направлении». Если два вектора (длины 1) указывают в одном и том же направлении, скалярное произведение равно 1. Если два вектора (длины 1) указывают в совершенно противоположном направлении, скалярное произведение равно -1. Если два вектора находятся под углом 90 градусов, скалярное произведение равно 0:

![Dot product](/images/external/erBE2yl.png)

:::информация
Технически `dot(A, B) = length(A) * length(B) * cos(angle)`, поэтому будьте осторожны при вычислении скалярного произведения векторов длины, отличной от 1: они больше не будут находиться в диапазоне от -1 до 1.
:::
### Нормализация

Как показано выше, часто очень полезно иметь векторы длиной 1 (только направление, а не расстояние). Это настолько распространенное явление, что для его расчета существует стандартная процедура: нормализация. При нормализации вектора вы просто делите его на длину (или умножаете на 1/длина). Это всегда даст вам вектор длины 1.

:::информация
Векторы длиной 1 называются «нормальными» или «единичными» векторами.
:::

##Векторная математика в играх

### Создание предмета перед игроком
Допустим, мы хотим создать предмет на расстоянии 100 единиц перед героем игрока. Как нам рассчитать это местоположение `A`?

Мы можем визуализировать этот вопрос так:

![Spawning in front of a player](/images/external/1ksId50.png)

Ссылаясь на эту визуализацию, становится очевидным, что мы можем вычислить это A следующим образом:

::: кодовая группа
```
lua [Lua]
-- Calculate the vector from the hero to the point by multiplying
-- their forward vector (length 1) with the desired distance.
local heroToPoint = hero:GetForwardVector() * 100
-- Calculate world position  of the item by adding the vector
-- from hero to point to the world position of the hero
local itemPos = hero:GetAbsOrigin() + heroToPoint
```

```
ts [TypeScript]
// Calculate the vector from the hero to the point by multiplying
// their forward vector (length 1) with the desired distance.
const heroToPoint = (hero.GetForwardVector() * 100) as Vector;
// Calculate world position  of the item by adding the vector
// from hero to point to the world position of the hero
const itemPos = (hero.GetAbsOrigin() + heroToPoint) as Vector;
```

:::

### Checking if unit is facing a direction

Another common question is how can we calculate if my unit is facing a specific point on the map.

We visualize this problem like this:

![Facing point?](/images/external/iBH3cIk.png)

Итак, глядя на визуализацию, когда юнит смотрит в точку P? Что ж, похоже, это происходит, когда их прямой вектор (оранжевый) совпадает с вектором от единицы к точке (фиолетовый). Таким образом, запись этого в коде будет выглядеть примерно так:

::: кодовая группа
```
lua [Lua]
function isUnitFacingPoint(unit, point)
  -- Calculate the relative position of the unit to the point
  local relativePosition = point - unit:GetAbsOrigin()
  -- Remember, using dot product works best with normal vectors
  -- The unit's forward is already normal, but we need to normalize
  -- the relative position to only get its direction.
  local directionToPoint = relativePosition:Normalized()

  -- Check if the alignment of the forward vector and relative direction
  -- is within some acceptable range of tolerance
  return unit:GetForwardVector():Dot(directionToPoint) > 0.7
end
```

```
ts [TypeScript]
function isUnitFacingPoint(unit: CDOTA_BaseNPC, point: Vector): boolean {
  // Calculate the relative position of the unit to the point
  const relativePosition = (point - unit.GetAbsOrigin()) as Vector;
  // Remember, using dot product works best with normal vectors
  // The unit's forward is already normal, but we need to normalize
  // the relative position to only get its direction.
  const relativeDirection = relativePosition.Normalized();

  // Check if the alignment of the forward vector and relative direction
  // is within some acceptable range of tolerance
  return unit.GetForwardVector().Dot(relativeDirection) > 0.7;
}
```

:::

### Checking if unit is attacked from behind

This question is similar to the previous question, only now there are two units facing in different ways:

![Attacking from behind](/images/external/uLT3QzQ.png)

Looking at this drawing it becomes obvious that the forward vector of unit 2 (F2) actually does **not** matter. What matters is the angle (dot product) between the forward vector of the unit getting attacked, and the where the attack is coming from (the vector from unit 2 to unit 1: `P1 - P2`)

::: code-group

```
lua [Lua]
function isAttackedFromBehind(victim, attacker)
  -- Calculate the relative position from attacker to victim (P1 - P2)
  local relativePosition = victim:GetAbsOrigin() - attacker:GetAbsOrigin()
  -- Normalize relative position to get attack direction
  local attackDirection = relativePosition:Normalized()
  -- Get the forward vector of the victim
  local victimForward = victim:GetForwardVector()

  -- Check if both normal(!) vectors are pointing in the same direction
  return victimForward:Dot(attackDirection) > 0.7
end
```

```
ts [TypeScript]
function isAttackedFromBehind(victim: CDOTA_BaseNPC, attacker: CDOTA_BaseNPC): boolean {
  // Calculate the relative position from attacker to victim (P1 - P2)
  const relativePosition = (victim.GetAbsOrigin() - attacker.GetAbsOrigin()) as Vector;
  // Normalize relative position to get attack direction
  const attackDirection = relativePosition.Normalized();
  // Get the forward vector of the victim
  const victimForward = victim.GetForwardVector();

  // Check if both normal(!) vectors are pointing in the same direction
  return victimForward.Dot(attackDirection) > 0.7;
}
```

:::

### Creating some effects around player

Consider the case where you want multiple things to happen evenly spaced in a circle around the player character. We can visualize it as follows:

![Circular effect](/images/external/TOqC1Ly.png)

By now it should be obvious we need to add the green vectors to the player position, the question is however how do you calculate these green vectors?

Что мы можем просто сделать, так это разделить полный радиус круга (2\*pi) на количество точек, которые мы хотим использовать, а затем для каждого угла вычислить единичный вектор угла, умножить его на желаемую длину и добавить к позиции игрока:

::: кодовая группа
```
lua [Lua]
-- Calculate the angle between each point on the circle
-- (This is in radians, the full circle is 2*pi radians)
local angle = 2 * math.pi / numPoints

for i=1,numPoints do
  -- Create direction vector from the angle
  local direction = Vector(math.cos(angle * i), math.sin(angle * i))
  -- Multiply the direction (length 1) with the desired radius of the circle
  local circlePoint = direction * radius

  -- Add the calculated green vector to the player position and do something
  doSomething(player:GetAbsOrigin() + circlePoint)
end
```

```
ts [TypeScript]
// Calculate the angle between each point on the circle
// (This is in radians, the full circle is 2*pi radians)
const angle = (2 * Math.PI) / numPoints;

for (let i = 0; i < numPoints; i++) {
  // Create direction vector from the angle
  const direction = Vector(Math.cos(angle * i), Math.sin(angle * i));
  // Multiply the direction (length 1) with the desired radius of the circle
  const circlePoint = (direction * radius) as Vector;

  // Add the calculated green vector to the player position and do something
  doSomething((player.GetAbsOrigin() + circlePoint) as Vector);
}
```

:::

### Physics with vectors - Homing projectile

As you have seen vector math is quite powerful and can be used to express positional and movement concepts in simple statements. In this final example I will show how to do a simple 'physics' simulation to create a homing projectile.

We will express the projectile using two vectors: `position` and `velocity`. This makes the projectile unable to instantly change its direction, but suffer some inertia: it will home in on the player on every tick, but it cannot easily slow down or change direction:

![](/images/external/GVK8Nbo.png)

Чтобы добиться этого эффекта, мы просто «ускоряем» скорость снаряда по направлению к игроку при каждом обновлении, поэтому скорость немного поворачивается в сторону игрока при каждом обновлении. Затем мы просто обновляем позицию на основе текущей скорости:

::: кодовая группа
```
lua [Lua]
function updateProjectile(projectile, target)
    -- Calculate direction from projectile to target
    local relativeTargetPos = target:GetAbsOrigin() - projectile:GetAbsOrigin()
    local targetDirection = relativeTargetPos:Normalized()

    -- Now we update the projectile velocity to point more to the target
    -- Note: you can increase/decrease acceleration to make it change direction
    -- faster or slower
    projectile.velocity = projectile.velocity + targetDirection * acceleration

    -- Next we update the projectile position by simply adding the velocity
    projectile.position = projectile.position + projectile.velocity
end
```

```
ts [TypeScript]
function updateProjectile(projectile: Projectile, target: CDOTA_BaseNPC): void {
  // Calculate direction from projectile to target
  const relativeTargetPos = (target.GetAbsOrigin() - projectile.GetAbsOrigin()) as Vector;
  const targetDirection = relativeTargetPos.Normalized();

  // Now we update the projectile velocity to point more to the target
  // Note: you can increase/decrease acceleration to make it change direction
  // faster or slower
  projectile.velocity = (projectile.velocity + targetDirection * acceleration) as Vector;

  // Next we update the projectile position by simply adding the velocity
  projectile.position = (projectile.position + projectile.velocity) as Vector;
}
```

:::
