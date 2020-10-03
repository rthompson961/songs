<?php

namespace App\DataFixtures;

use App\Entity\Vote;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class VoteFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $data = [
            [
                'song' => 'peter-andre',
                'quantity' => 4
            ],
            [
                'song' => 'rednex',
                'quantity' => 1
            ],
            [
                'song' => 'pj-&-duncan',
                'quantity' => 5
            ],
            [
                'song' => 'whigfield',
                'quantity' => 3
            ],
            [
                'song' => 'babylon-zoo',
                'quantity' => 5
            ],
            [
                'song' => 'pj-&-duncan',
                'quantity' => 3
            ],
            [
                'song' => 'whigfield',
                'quantity' => 7
            ],
            [
                'song' => 'spice-girls',
                'quantity' => 3
            ],
            [
                'song' => 'pj-&-duncan',
                'quantity' => 4
            ],
            [
                'song' => 'shaggy',
                'quantity' => 1
            ]
        ];


        foreach ($data as $item) {
            $vote = new Vote();
            $vote->setSong($this->getReference($item['song']));
            $vote->setQuantity($item['quantity']);
            $manager->persist($vote);
        }

        $manager->flush();
    }
}
