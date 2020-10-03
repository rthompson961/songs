<?php

namespace App\DataFixtures;

use App\Entity\Song;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class SongFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $data = [
            'Peter Andre' => 'Mysterious Girl',
            'PJ & Duncan' => 'Let\'s Get Ready To Rumble',
            'Rednex' => 'Cottoneye Joe',
            'Whigfield' => 'Saturday Night',
            '2 Unlimited' => 'No Limit',
            'Pato Banton' => 'Baby Come Back',
            'Babylon Zoo' => 'Spaceman',
            'Jimmy Nail' => 'Crocodile Shoes',
            'Shaggy' => 'Mr Boombastic',
            'Spice Girls' => 'Wannabe',
        ];

        foreach ($data as $key => $val) {
            $song = new Song();
            $song->setTitle($val);
            $song->setArtist($key);
            $manager->persist($song);
            $this->addReference(strtolower(str_replace(' ', '-', $key)) , $song);
        }

        $manager->flush();
    }
}
